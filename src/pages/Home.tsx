import { useContext, useEffect, useMemo, useState } from 'react'
import Fuse, { FuseResult } from 'fuse.js'
import YAML from 'yaml'

// Internal imports
import Layout from '../components/Layout'
import { RefContext } from '../components/RefProvider'
import Results from '../components/post/Results'
import NoPostFound from '../components/post/NoPostFound'
import AllPosts from '../components/post/AllPosts'

export interface MetadataI {
    id: number,
    title: string,
    tags: string[],
    slug: string,
    path: string,
    authors: string[],
    date: Date,
}

export interface PostI {
    metadata: MetadataI
    html: string,
}

export default function Home() {

    const context = useContext(RefContext);

    const [posts, setPosts] = useState<PostI[]>([])
    const [results, setResults] = useState<FuseResult<PostI>[]>([])

    const fuse = useMemo(() => {
        return new Fuse(posts, {
            threshold: 0.3,
            ignoreLocation: true,
            keys: [
                'metadata.title',
                'metadata.authors',
                'metadata.tags',
                'html',
            ]
        })
    }, [posts])

    // Loads html
    const loadHtml = async (path: string) => {
        return await fetch(path)
            .then(response => response.text())
            .then(data => data)
            .catch(err => console.error("Error loading HTML file", err))
    }

    // Loads and sorts all posts
    const loadMetadatas = async (modules: Record<string, () => Promise<MetadataI>>) => {

        const loadedModules: PostI[] = []

        for (const path in modules) {

            const module = await fetch(path)
                .then(response => response.text())
                .then(data => data)
                .catch(err => console.error("Error loading YAML file", err))

            if (module) {
                const metadata = YAML.parse(module)
                const html = await loadHtml(`../../posts/html/${metadata.path}`)
                if (html) {
                    loadedModules.push({
                        html: html,
                        metadata: {
                            ...metadata,
                            date: new Date(metadata.date)
                        }
                    })
                }
            }

        }
        loadedModules.sort((a: PostI, b: PostI) => {
            return b.metadata.date.getTime() - a.metadata.date.getTime()
        });

        setPosts(loadedModules)
    }

    useEffect(() => {
        loadMetadatas(import.meta.glob<MetadataI>('../../posts/metadata/*.yaml'));
    }, [])

    const promiseSearch: Promise<FuseResult<PostI>[]> = useMemo(() => {

        return new Promise((resolve, reject) => {

            if (context?.inputValue)
                resolve(fuse.search(context.inputValue))
            else
                resolve([])

            reject(Error('Error searching post'))
        })

    }, [context?.inputValue, fuse])

    // Search posts through the context of the search bar
    useEffect(() => {

        const search = async () => {
            await promiseSearch
                .then(resolve => {
                    setResults(resolve)
                })
                .catch(error => console.error(error))
        }
        search()

    }, [context?.inputValue, promiseSearch])

    return (
        <Layout showSearch>
            <div className='flex flex-col gap-y-5'>
                {results.length > 0 ?
                    <Results results={results} /> :
                    context?.inputValue !== undefined && context?.inputValue?.length <= 0 ?
                        <AllPosts posts={posts} /> :
                        <NoPostFound />
                }
            </div>
        </Layout >
    )
}

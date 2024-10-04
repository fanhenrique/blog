import { useContext, useEffect, useMemo, useState } from 'react'
import Fuse, { FuseResult } from 'fuse.js'

// Internal imports
import Layout from '../components/Layout'
import { RefContext } from '../components/RefProvider'
import Results from '../components/cards/Results'
import NoPostFound from '../components/cards/NoPostFound'
import AllPosts from '../components/cards/AllPosts'
import { PostI } from './Post'

export interface MetadataPostI {
    id: number,
    title: string,
    tags: string[],
    slug: string,
    authors: string[],
    date: Date,
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

    // Loads and sorts all posts
    const loadMetadatas = async (modules: Record<string, () => Promise<MetadataPostI>>) => {

        const loadedModules: PostI[] = []

        for (const path in modules) {

            const metadata = await modules[path]()
                .then(response => response)
                .catch(err => console.error("Error loading YAML file", err))

            if (metadata) {

                const filepath = modules[path].name.split('/')
                const filename = filepath[filepath.length - 1].split('.')[0]
                const html = await import(`../../posts/html/${filename}.html?raw`)

                if (html.default) {
                    loadedModules.push({
                        // clean html - Remove all HTML tags to avoid interfering with the search.
                        html: html.default.replace(/<[^>]*>/g, ''),
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
        loadMetadatas(import.meta.glob<MetadataPostI>('../../posts/metadata/*.yaml'));
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

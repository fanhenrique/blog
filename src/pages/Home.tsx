import { useContext, useEffect, useMemo, useState } from 'react'
import Fuse, { FuseResult } from 'fuse.js';

// Internal imports
import Layout from '../components/Layout'
import { PostInterface } from './Post'
import { RefContext } from '../components/RefProvider';
import Results from '../components/post/Results';
import NoPostFound from '../components/post/NoPostFound';
import AllPosts from '../components/post/AllPosts';

export default function Home() {

    const context = useContext(RefContext);

    const [posts, setPost] = useState<PostInterface[]>([])
    const [results, setResults] = useState<FuseResult<PostInterface>[]>([])

    const fuse = useMemo(() => {
        return new Fuse(posts, {
            threshold: 0.3,
            ignoreLocation: true,
            keys: [
                'attributes.title',
                'attributes.authors',
                'attributes.tags',
                'markdown',
            ]
        })
    }, [posts])

    // Loads and sorts all posts
    const loadModules = async (modules: Record<string, () => Promise<PostInterface>>) => {

        const loadedModules: PostInterface[] = []

        for (const path in modules) {

            const markdown = await modules[path]()
                .then(module => {
                    return ({
                        markdown: module.markdown,
                        attributes: {
                            ...module.attributes,
                            date: new Date(module.attributes.date),
                        },
                    })
                })
                .catch(error => console.error(error))

            if (markdown) loadedModules.push(markdown)
        }

        loadedModules.sort((a: PostInterface, b: PostInterface) => {
            return b.attributes.date.getTime() - a.attributes.date.getTime()
        });

        setPost(loadedModules)
    }

    useEffect(() => {
        loadModules(import.meta.glob<PostInterface>('../../posts/*.md'))
    }, [])


    const promiseSearch: Promise<FuseResult<PostInterface>[]> = useMemo(() => {

        return new Promise((resolve, reject) => {

            if (context?.inputValue)
                resolve(fuse.search(context.inputValue))
            else
                resolve([])

            reject(Error('Error in search'))
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

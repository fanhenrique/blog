import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';

// Internal imports
import Layout from '../components/Layout'
import Comments from '../components/document/Comments';
import HeaderPost from '../components/document/PostHeader';
import Document from '../components/document/Document';
import { MetadataPostI } from './Home';

export interface PostI {
    metadata: MetadataPostI
    html: string,
}

export default function Post() {

    const location = useLocation()
    const navigate = useNavigate()

    const [post, setPost] = useState<PostI>()

    const loadMetadatas = async (modules: Record<string, () => Promise<MetadataPostI>>) => {

        let validAuthor = false

        for (const path in modules) {

            const metadata = await modules[path]()
                .then(response => response)
                .catch(err => console.error("Error loading YAML file", err))

            if (metadata && metadata.slug === location.pathname.split('/')[2]) {

                const filepath = modules[path].name.split('/')
                const filename = filepath[filepath.length - 1].split('.')[0]
                const html = await import(`../../posts/html/${filename}.html?raw`)

                if (html.default) {
                    setPost({
                        html: html.default,
                        metadata: {
                            ...metadata,
                            date: new Date(metadata.date)
                        }
                    })
                    validAuthor = true; break
                }
            }
        }
        if (!validAuthor) navigate('/')
    }

    useEffect(() => {
        loadMetadatas(import.meta.glob<MetadataPostI>('../../posts/metadata/*.yaml'));
    }, [])

    return (
        <Layout>
            <div className='w-full bg-secondary-color p-4 overflow-x-hidden'>
                <HeaderPost authors={post?.metadata.authors} date={post?.metadata.date} />
                {post?.html ? <Document text={post?.html} /> : <></>}
                <Comments />
            </div>
        </Layout >
    )
}

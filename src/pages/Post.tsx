import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import YAML from 'yaml'

// Internal imports
import Layout from '../components/Layout'
import Comments from '../components/document/Comments';
import HeaderPost from '../components/document/PostHeader';
import Document from '../components/document/Document';
import { MetadataPostI } from './Home';
import { loadHtml } from './utils';

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

            const module = await fetch(path)
                .then(response => response.text())
                .then(data => data)
                .catch(err => console.error("Error loading YAML file", err))

            if (module) {
                const metadata = YAML.parse(module)

                if (metadata && metadata.slug == location.pathname.split('/')[2]) {

                    const html = await loadHtml(`../../posts/html/${metadata.path}`)

                    if (html) {
                        setPost({
                            html: html,
                            metadata: {
                                ...metadata,
                                date: new Date(metadata.date)
                            }
                        })
                        validAuthor = true; break
                    }
                }

            }
        }
        if (!validAuthor) navigate('/authors')
    }

    useEffect(() => {
        loadMetadatas(import.meta.glob<MetadataPostI>('../../posts/metadata/*.yaml'));
    }, [])

    return (
        <Layout>
            <div className='w-full bg-secondary-color p-4 overflow-x-hidden'>
                <HeaderPost authors={post?.metadata.authors} date={post?.metadata.date} />
                <Document text={post?.html} />
                <Comments />
            </div>
        </Layout >
    )
}

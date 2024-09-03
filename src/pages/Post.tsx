import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'

// internal imports
import Layout from '../components/Layout'
import Comments from '../components/post/Comments';
import HeaderPost from '../components/post/HeaderPost';
import CustomMarkdown from '../components/markdown/CustomMarkdown';

export interface AttributesPostInteface {
    id: number,
    title: string,
    tags: string[],
    slug: string,
    authors: string[],
    date: Date,
}

export interface PostInterface {
    attributes: AttributesPostInteface
    markdown: string,
}

export default function Post() {

    const navigate = useNavigate()
    const location = useLocation()

    const [post, setPost] = useState<PostInterface | null>(null)

    // Load post from url path
    const loadModules = async (modules: Record<string, () => Promise<PostInterface>>) => {

        let validPost = false

        for (const path in modules) {
            const module = await modules[path]();
            if (module.attributes.slug == location.pathname.split('/')[2]) {
                setPost({
                    markdown: module.markdown,
                    attributes: {
                        ...module.attributes,
                        date: new Date(module.attributes.date),
                    },
                });
                validPost = true; break
            }
        }
        if (!validPost) navigate('/')
    };

    useEffect(() => {
        loadModules(import.meta.glob<PostInterface>('../../posts/*.md'));
    }, []);

    return (
        <Layout>
            <div className='w-full bg-secondary-color p-4'>
                <HeaderPost authors={post?.attributes.authors} date={post?.attributes.date} />
                <CustomMarkdown>{post?.markdown}</CustomMarkdown>
                <Comments />
            </div>
        </Layout>
    )
}

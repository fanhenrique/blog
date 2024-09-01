import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkRehype from 'remark-rehype';

// internal imports
import Layout from '../components/Layout'
import Comments from '../components/markdown/Comments';
import HeaderPost from '../components/markdown/HeaderPost';
import Heading1 from '../components/markdown/Heading1';
import Heading2 from '../components/markdown/Heading2';
import Heading3 from '../components/markdown/Heading3';
import Heading4 from '../components/markdown/Heading4';
import Heading5 from '../components/markdown/Heading5';
import Heading6 from '../components/markdown/Heading6';
import Hr from '../components/markdown/Hr';
import Paragraph from '../components/markdown/Paragraph';
import Anchor from '../components/markdown/Anchor';
import Blockquote from '../components/markdown/Blockquote';
import Code from '../components/markdown/Code';
import Cite from '../components/markdown/Cite';
import Ul from '../components/markdown/Ul';
import Ol from '../components/markdown/Ol';

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
                <Markdown
                    children={post?.markdown}
                    className='markdown w-full'
                    skipHtml={false}
                    remarkPlugins={[remarkGfm,  // support GFM (GitHub flavored markdown) - (autolink literals, footnotes, strikethrough, tables, tasklists).
                        [remarkRehype, { // plugin remark que transforma markdown em HTML para dar suporte ao rehype.
                            footnoteLabel: ' ',
                            footnoteLabelTagName: 'div',
                        }]
                    ]
                    }
                    rehypePlugins={[rehypeRaw]} // support HTML This plugin passes each node and embedded raw HTML 
                    // through an HTML parser (parse5), to recreate a tree exactly as how 
                    // a browser would parse it, while keeping the original data and positional info intact.
                    components={{
                        h1: Heading1,
                        h2: Heading2,
                        h3: Heading3,
                        h4: Heading4,
                        h5: Heading5,
                        h6: Heading6,
                        hr: Hr,
                        p: Paragraph,
                        blockquote: Blockquote,
                        sup: Cite,
                        a: Anchor,
                        code: Code,
                        ul: Ul,
                        ol: Ol,
                    }}
                />
                <Comments />
            </div>
        </Layout>
    )
}

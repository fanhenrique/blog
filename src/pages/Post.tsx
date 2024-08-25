import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkRehype from 'remark-rehype';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

// internal imports
import Layout from '../components/Layout'
import CodeCopyButton from '../components/CodeCopyButton'
import Comments from '../components/Comments';
import HeaderPost from '../components/HeaderPost';

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

    const [post, setPost] = useState<PostInterface | undefined>(undefined)

    useEffect(() => {

        const modules = import.meta.glob<PostInterface>('../../posts/*.md');

        let validPost = false
        const loadModules = async () => {

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

                    validPost = true
                    break
                }
            }

            if (!validPost)
                navigate('/')

        };

        loadModules();

    }, []);

    const Pre = ({ children }: any) => <div
        className="
            flex p-1
            justify-between
            bg-backgroud-color 
        ">
        {children}
        <CodeCopyButton>{children}</CodeCopyButton>
    </div>

    return (

        <Layout>
            <div className='w-full flex flex-col gap-y-10 bg-secondary-color p-4'>
                <div className='w-full flex flex-col'>
                    <HeaderPost authors={post?.attributes.authors} date={post?.attributes.date} />
                    <Markdown
                        children={post?.markdown}
                        className='markdown flex flex-col gap-y-3 text-justify'
                        skipHtml={false}
                        remarkPlugins={[remarkGfm,  // support GFM (GitHub flavored markdown) - (autolink literals, footnotes, strikethrough, tables, tasklists).
                            [remarkRehype, { footnoteLabel: ' ', footnoteLabelTagName: 'div' }]] // plugin remark que transforma markdown em HTML para dar suporte ao rehype.
                        }
                        rehypePlugins={[rehypeRaw]} // support HTML This plugin passes each node and embedded raw HTML 
                        // through an HTML parser (parse5), to recreate a tree exactly as how 
                        // a browser would parse it, while keeping the original data and positional info intact.
                        components={{
                            pre: Pre,
                            code(props: any) {
                                const { children, className } = props

                                const match = /language-(\w+)/.exec(className || '')

                                const lineCount = children.split('\n').length;
                                const minWidthEm = `${lineCount.toString().length * 0.8}em`;

                                return match ? (
                                    <SyntaxHighlighter
                                        PreTag='pre'
                                        children={String(children).replace(/\n$/, '')}
                                        language={match[1]}
                                        style={okaidia}
                                        showLineNumbers={true}
                                        lineNumberStyle={{
                                            paddingRight: '8px',
                                            minWidth: minWidthEm,
                                        }}
                                        customStyle={{
                                            background: '#0F0F0F',
                                            padding: '0px',
                                            paddingBottom: '15px',
                                            margin: '0px',
                                            borderRadius: '0px',
                                            overflowY: 'hidden',
                                        }}
                                    />
                                ) : (
                                    <code className='markdown-code'>
                                        {children}
                                    </code>
                                )
                            }
                        }}
                    />
                </div>
                <Comments />
            </div>
        </Layout>
    )
}

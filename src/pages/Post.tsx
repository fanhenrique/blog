import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Giscus from '@giscus/react';

// internal imports
import Layout from '../components/Layout'
import CodeCopyButton from '../components/CodeCopyButton'
import ListAuthors from '../components/ListAuthors';

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

    const location = useLocation()

    const [post, setPost] = useState<PostInterface | undefined>(undefined)

    useEffect((): void => {

        const modules = import.meta.glob<PostInterface>('../../posts/*.md');

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
                }
            }
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
            <div className='w-full flex flex-col gap-y-2 bg-secondary-color p-4'>
                <div className='flex justify-between text-gray-200'>
                    <ListAuthors authors={post?.attributes.authors} />
                    <span className="text-nowrap text-gray-200">
                        {post?.attributes.date.toLocaleDateString("pt-BR")}
                    </span>
                </div>
                <hr className="h-0.5 bg-gray-700 border-0 " />
                <Markdown
                    children={post?.markdown}
                    className='markdown flex flex-col gap-y-4 text-justify'
                    skipHtml={false}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
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

                <Giscus
                    id="comments"
                    repo="fanhenrique/blog"
                    repoId="R_kgDOMgtBwQ"
                    category="Announcements"
                    categoryId="DIC_kwDOMgtBwc4ChfNk"
                    mapping="pathname"
                    term="Welcome to @giscus/react component!"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme="dark"
                    lang="pt"
                    loading="lazy"
                />

            </div>
        </Layout>
    )
}

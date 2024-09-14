import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

// Internal imports
import Heading1 from "./Heading1";
import Heading2 from "./Heading2";
import Heading3 from "./Heading3";
import Heading4 from "./Heading4";
import Heading5 from "./Heading5";
import Heading6 from "./Heading6";
import Hr from "./Hr";
import Blockquote from "./Blockquote";
import Cite from "./Cite";
import Ul from "./Ul";
import Ol from "./Ol";
import Code from "./Code";
import Anchor from "./Anchor";
import Paragraph from "./Paragraph";

interface CustomMarkdownProps {
    children: string | undefined
}

export default function CustomMarkdown(props: CustomMarkdownProps) {

    return (
        <Markdown
            children={props.children}
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
    )
}
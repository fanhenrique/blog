import { HTMLAttributes } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Code(props: HTMLAttributes<HTMLElement>) {

    const { children, className } = props

    const match = /language-(\w+)/.exec(className || '')

    let minWidthEm = ''
    if (children) {
        if (children instanceof String) {
            const lineCount = children.split('\n').length;
            minWidthEm = `${lineCount.toString().length * 0.8}em`;
        }
    }

    if (match) {
        return (
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
        )
    } else {
        return (
            <code
                className='
                    text-gray-200 font-semibold 
                    text-lg text-left
                    bg-backgroud-color
                    whitespace-normal
                    p-1 rounded-md
                '
            >
                {children}
            </code>
        )
    }



}
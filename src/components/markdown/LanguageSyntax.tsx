import { ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';

//Internal imports
import CodeBox from './CodeBox';

interface LanguageSyntaxProps {
    children: ReactNode
    language: string
}

export default function LanguageSyntax(props: LanguageSyntaxProps) {

    let minWidthEm = ''
    if (props.children) {
        const lineCount = String(props.children).split('\n').length;
        minWidthEm = `${lineCount.toString().length * 0.9}em`;
    }

    return (
        <CodeBox copy={props.children}>
            <SyntaxHighlighter
                PreTag='pre'
                children={String(props.children).replace(/\n$/, '')}
                language={props.language}
                style={okaidia}
                showLineNumbers={true}
                lineNumberStyle={{
                    paddingRight: '8px',
                    minWidth: minWidthEm,
                }}
                customStyle={{
                    width: '100%',
                    background: '#0F0F0F',
                    padding: '0px',
                    paddingBottom: '15px',
                    margin: '0px',
                }}
            />
        </CodeBox>
    )
}
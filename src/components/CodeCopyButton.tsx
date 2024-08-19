import { ReactNode, useState } from "react";

interface CodeCopyButtonProps {
    children: ReactNode;
}

export default function CodeCopyButton({ children }: CodeCopyButtonProps) {

    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (code: string) => {

        const codeText = (children as React.ReactElement).props.children;

        navigator.clipboard.writeText(codeText).then(() => {
            setCopied(code);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    return (
        <button
            className='
                flex
                text-right
                text-gray-200
                hover:text-primary-color 
                font-bold'
            onClick={() => handleCopy(String(children))}>
            {copied === String(children) ? 'Copied!' : 'Copy'}
        </button>
    );
}

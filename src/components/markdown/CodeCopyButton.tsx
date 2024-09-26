import { ReactNode, useState } from "react";

interface CodeCopyButtonProps {
    children: ReactNode;
}

export default function CodeCopyButton(props: CodeCopyButtonProps) {

    const [copied, setCopied] = useState<string | null>(null);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopied(code);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    return (
        <button
            className='
                absolute
                top-1
                right-2
                flex h-fit
                text-right
                text-gray-200
                hover:text-primary-color 
                font-bold'
            onClick={() => handleCopy(String(props.children))}>
            {copied === String(props.children) ? 'Copied!' : 'Copy'}
        </button>
    );
}

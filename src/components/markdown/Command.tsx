import { HTMLAttributes } from 'react';

// Internal imports
import CodeCopyButton from './CodeCopyButton';

export default function Command(props: HTMLAttributes<HTMLPreElement>) {

    return (
        <div className="w-full flex p-2 justify-between bg-backgroud-color my-5">
            <pre
                className='
                    w-fit max-w-full
                    text-gray-200 font-semibold 
                    text-lg text-lef
                    whitespace-pre-wrap
                '
            >
                <code>{props.children}</code>
            </pre>
            <CodeCopyButton>{props.children}</CodeCopyButton>
        </div>
    )
}
import { HTMLAttributes } from 'react';

// Internal imports
import CodeBox from './CodeBox';

export default function Command(props: HTMLAttributes<HTMLPreElement>) {

    return (
        <CodeBox copy={props.children}>
            <pre
                className="
                    w-fit max-w-full
                    font-semibold 
                    text-lg text-lef
                    whitespace-pre-wrap
                "
            >
                <code>{props.children}</code>
            </pre>
        </CodeBox>
    )
}
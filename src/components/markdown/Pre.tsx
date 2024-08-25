import { HTMLAttributes } from "react";

// internal imports
import CodeCopyButton from "./CodeCopyButton";

export default function Pre(props: HTMLAttributes<HTMLPreElement>) {

    return (
        <pre
            {...props}
            className="
            flex p-1
            justify-between
            bg-backgroud-color 
        "
        >
            {props.children}
            <CodeCopyButton>{props.children}</CodeCopyButton>
        </pre>
    )
}
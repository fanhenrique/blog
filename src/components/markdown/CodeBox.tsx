import { ReactNode } from "react";
import CodeCopyButton from "./CodeCopyButton";

interface CodeBoxProps {
    children: JSX.Element
    copy: ReactNode
}

export default function CodeBox(props: CodeBoxProps) {
    return (
        <div
            className="
                w-full flex 
                p-2 my-5
                relative
                bg-backgroud-color  
            "
        >
            {props.children}
            <CodeCopyButton>{props.copy}</CodeCopyButton>
        </div>
    )
}
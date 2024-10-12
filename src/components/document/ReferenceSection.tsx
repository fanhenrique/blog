import { HTMLAttributes } from "react";

export default function ReferenceSection(props: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className="
                flex flex-col 
                gap-y-5 
                mt-2 mb-5
            "
        >
            {props.children}
        </div>
    )
}
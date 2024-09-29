import { HTMLAttributes } from "react";

// Post subsection with top margin
export default function Heading3(props: HTMLAttributes<HTMLHeadingElement>) {

    return (
        <h3
            className="
                text-2xl
                font-semibold
                capitalize
                mt-10
            "
            {...props}
        >
            {props.children}
        </h3>
    )
}
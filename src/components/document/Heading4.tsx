import { HTMLAttributes } from "react";

// Post subsection with small top margin - use after section (h2)
export default function Heading4(props: HTMLAttributes<HTMLHeadingElement>) {

    return (
        <h4
            className="
                text-2xl
                font-semibold
                capitalize
                mt-1
            "
            {...props}
        >
            {props.children}
        </h4>
    )
}
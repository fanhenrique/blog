import { HTMLAttributes } from "react";

// Title for commands and codes
export default function Heading6(props: HTMLAttributes<HTMLHeadingElement>) {

    return (
        <h6
            className="
                text-xl
                font-semibold
                capitalize
                mt-5 -mb-4
            "
            {...props}
        >
            {props.children}
        </h6>
    )
}
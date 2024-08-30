import { HTMLAttributes } from "react";

// Post subsubsection no top margin
export default function Heading5(props: HTMLAttributes<HTMLHeadingElement>) {

    return (
        <h5
            className="
                text-xl
                text-gray-200
                font-semibold
                capitalize
            "
            {...props}
        >
            {props.children}
        </h5>
    )
}
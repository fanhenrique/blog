import { HTMLAttributes } from "react";

// Post title
export default function Heading1(props: HTMLAttributes<HTMLHeadingElement>) {

    return (
        <h1
            className="
                text-5xl
                font-black
                capitalize
                my-7
            "
            {...props}
        >
            {props.children}
        </h1>
    )
}
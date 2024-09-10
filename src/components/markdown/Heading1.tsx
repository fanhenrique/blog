import { HTMLAttributes } from "react";

// Post title
export default function Heading1(props: HTMLAttributes<HTMLHeadingElement>) {

    return (
        <h1
            className="
                text-5xl 
                text-gray-200
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
import { HTMLAttributes } from "react";

// Post title
export default function Heading1(props: HTMLAttributes<HTMLHeadingElement>) {

    return (
        <h1
            className="
                text-4xl 
                text-gray-200
                font-black
                capitalize
                my-5
            "
            {...props}
        >
            {props.children}
        </h1>
    )
}
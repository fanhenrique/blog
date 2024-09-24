import { HTMLAttributes } from "react";

export default function Code(props: HTMLAttributes<HTMLElement>){

    return (
        <code
            className="
                w-fit inline
                text-gray-200 
                text-lg
                font-semibold 
                bg-backgroud-color
                py-0.5 px-1 rounded-md
            "
        >
            {props.children}
        </code>
    )
}
import { HTMLAttributes } from "react"

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    children: string
}

export default function Tag(props: TagProps) {

    return (
        <span
            className="
                hover:bg-primary-color
                hover:text-gray-200
                hover:cursor-pointer
                text-nowrap
                py-0.5 px-1 text-base
                font-semibold
                rounded-lg
            "
            {...props}
        >
            {props.children}
        </span>
    )
}
import { HTMLAttributes, useContext } from "react"

// Internal imports
import { RefContext } from "../RefProvider"

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    children: string
}

export default function Tag(props: TagProps) {

    const context = useContext(RefContext)

    return (
        <button
            className="
                hover:bg-primary-color
                hover:text-gray-200
                text-nowrap
                py-0.5 px-1 text-base
                font-semibold
                rounded-lg
            "
            onClick={() => { context?.setInputValue(props.children) }}
            {...props}
        >
            {props.children}
        </button>
    )
}
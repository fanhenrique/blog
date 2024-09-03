import { HTMLAttributes, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// Internal imports
import { RefContext } from "../RefProvider"

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    children: string
}

export default function Tag(props: TagProps) {

    const location = useLocation()
    const navigate = useNavigate()
    const context = useContext(RefContext)

    const handleClick = () => {
        if (location.pathname != '/') {
            context?.setInputValue(props.children)
            navigate('/')
        } else {
            context?.setInputValue(props.children)
        }
    }

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
            onClick={handleClick}
            {...props}
        >
            {props.children}
        </button>
    )
}
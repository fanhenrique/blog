import { HTMLAttributes, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// Internal imports
import { RefContext } from "./RefProvider"

interface ButtonSearchProps extends HTMLAttributes<HTMLButtonElement> {
    children: string
    search: string | undefined
}

export default function ButtonSearch(props: ButtonSearchProps) {

    const location = useLocation()
    const navigate = useNavigate()
    const context = useContext(RefContext)

    const handleClick = () => {
        if (location.pathname != '/') {
            context?.setInputValue(props.search)
            navigate('/')
        } else {
            context?.setInputValue(props.search)
        }
    }

    return (
        <button
            {...props}
            onClick={handleClick}
        >
            {props.children}
        </button>
    )
}

import { HTMLAttributes } from "react"
import { useNavigate } from "react-router-dom"

interface GoAuthorPageProps extends HTMLAttributes<HTMLButtonElement> {
    children: string
}

export default function GoAuthorPage(props: GoAuthorPageProps) {

    const navigate = useNavigate()

    return (
        <button
            className="
                hover:text-primary-color
                cursor-pointer
                hover:underline 
                underline-offset-2
                capitalize
            "
            onClick={() => navigate(`/author/${props.children.replace(/ /g, '-')}`)}
        >
            {props.children}
        </button>
    )
}
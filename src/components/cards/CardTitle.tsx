import { HTMLAttributes } from "react"
import { useNavigate } from "react-router-dom"

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: string
    over: boolean
    navigate: string,
    onMouseOver: () => void
    onMouseOut: () => void
}

export default function CardTitle(props: CardTitleProps) {

    const navigate = useNavigate()

    return (
        <h1 className={`    
            w-fit text-2xl md:text-3xl lg:text-5xl  xl:text-5xl 
            font-semibold 
            text-left
            capitalize
            cursor-pointer
            ${props.over ? 'text-primary-color' : 'text-gray-200'}
        `}
            onMouseOver={() => { props.onMouseOver() }}
            onMouseOut={() => { props.onMouseOut() }}
            onClick={() => navigate(props.navigate)}
        >
            {props.children}
        </h1>
    )
}
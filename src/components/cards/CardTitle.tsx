import { HTMLAttributes } from "react"

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    title: string
    over: boolean
    onMouseOver: () => void
    onMouseOut: () => void
    navigate: () => void
}

export default function CardTitle(props: CardTitleProps) {

    return (
        <h1 className={`    
            w-fit h-fit text-2xl md:text-3xl lg:text-5xl xl:text-5xl 
            font-semibold 
            text-left
            capitalize
            cursor-pointer
            ${props.over ? 'text-primary-color' : 'text-gray-200'}
        `}
            onMouseOver={() => props.onMouseOver()}
            onMouseOut={() => props.onMouseOut()}
            onClick={() => props.navigate()}
        >
            {props.title}
        </h1 >
    )
}
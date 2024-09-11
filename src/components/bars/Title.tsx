import { useContext } from "react"
import { useNavigate } from "react-router-dom"

// Internal imports
import { RefContext } from "../RefProvider"

interface TitleProps {
    textSize?: string
}

export default function Title({ textSize = 'text-3xl' }: TitleProps) {

    const context = useContext(RefContext)
    const navigate = useNavigate()

    const redirect = () => {
        context?.setInputValue('')
        navigate('/')
    }

    return (
        <span
            className={`
                ${textSize}
                text-primary-color 
                font-black 
                cursor-pointer
            `}
            onClick={redirect}
        >
            blog
        </span >
    )
}
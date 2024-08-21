import { useNavigate } from "react-router-dom"

interface TitleProps {
    textSize?: string
}

export default function Title({ textSize = 'text-3xl' }: TitleProps) {
    const navigate = useNavigate()
    return (
        <span className={`
            ${textSize}
            text-primary-color 
            font-black 
            cursor-pointer
            `}
            onClick={() => navigate('/')}
        >
            blog
        </span >
    )
}
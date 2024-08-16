import { useNavigate } from "react-router-dom"
import { ButtonHTMLAttributes } from "react"

export interface ButtonMenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    navigate: string
}

export default function ButtonMenu(props: ButtonMenuProps) {

    const navigate = useNavigate()

    return (
        <button
            {...props}
            onClick={() => navigate(props.navigate)}
            className="
                outline-none 
                text-xl 
                text-gray-200 
                font-semibold 
                hover:border-b-4 
                border-primary-color
                focus:border-b-4
                cursor-pointer
            "
        >
            {props.children}
        </button>
    )
}
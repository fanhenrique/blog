import { useNavigate } from "react-router-dom"
import { ButtonHTMLAttributes, useContext } from "react"

// Internal imports
import { RefContext } from "../RefProvider"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    navigate: string
}

export default function Button(props: ButtonProps) {

    const navigate = useNavigate()
    const context = useContext(RefContext);

    const redirect = () => {
        context?.setInputValue('')
        navigate(props.navigate)
    }

    return (
        <button
            onClick={redirect}
            className="
                    h-fit w-fit 
                    text-xl text-gray-200 font-semibold
                    outline-none 
                    hover:underline focus:underline
                    decoration-primary-color
                    decoration-4 underline-offset-4
                "
            {...props}
        >
            {props.children}
        </button>
    )
}
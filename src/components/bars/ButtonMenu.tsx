import { useLocation, useNavigate } from "react-router-dom"
import { ButtonHTMLAttributes } from "react"

export interface ButtonMenuProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    navigate: string
}

export default function ButtonMenu(props: ButtonMenuProps) {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div className="w-full h-20 justify-center flex place-items-center">
            <button
                {...props}
                onClick={() => { props.navigate == location.pathname ? navigate(0) : navigate(props.navigate) }}
                className="
                h-fit w-fit 
                text-xl text-gray-200 font-semibold
                outline-none 
                hover:underline focus:underline
                decoration-primary-color
                decoration-4 underline-offset-4
                "
            >
                {props.children}
            </button>
        </div>
    )
}
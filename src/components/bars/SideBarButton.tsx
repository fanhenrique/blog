import { useNavigate } from "react-router-dom"
import { useContext } from "react"

// Internal imports
import Button, { ButtonProps } from "./Button"
import { RefContext } from "../RefProvider"

interface SideBarButtonProps extends ButtonProps {
    closeSideBar: () => void
}

export default function SideBarButton(props: SideBarButtonProps) {

    const context = useContext(RefContext)
    const navigate = useNavigate()

    const redirect = () => {
        context?.setInputValue('')
        if (props.closeSideBar)
            props.closeSideBar()
        navigate(props.navigate)
    }

    return (
        <Button
            navigate={props.navigate}
            onClick={redirect}
        >
            {props.children}
        </Button>
    )
}
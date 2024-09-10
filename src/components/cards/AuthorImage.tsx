import { UserCircle } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import colors from "tailwindcss/colors";

interface AuthorImageProps {
    image: string
    navigate: string,
    onMouseOver: () => void
    onMouseOut: () => void
}

export default function AuthorImage(props: AuthorImageProps) {

    const navigate = useNavigate()

    return (
        props.image ?
            <img
                className="w-full rounded-full cursor-pointer"
                src={props.image}
                onMouseOver={() => { props.onMouseOver() }}
                onMouseOut={() => { props.onMouseOut() }}
                onClick={() => navigate(props.navigate)}
            />
            :
            <UserCircle
                className="size-full cursor-pointer"
                viewBox="25 25 205 205"
                color={colors.gray[700]}
                weight="thin"
                onMouseOver={() => { props.onMouseOver() }}
                onMouseOut={() => { props.onMouseOut() }}
                onClick={() => navigate(props.navigate)}
            />
    )
}
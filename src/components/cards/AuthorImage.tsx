import { UserCircle } from "@phosphor-icons/react";
import colors from "tailwindcss/colors";

interface AuthorImageProps {
    image: string
    navigate: () => void,
    onMouseOver: () => void
    onMouseOut: () => void
}

export default function AuthorImage(props: AuthorImageProps) {

    return (
        props.image ?
            <img
                className="w-full rounded-full cursor-pointer"
                src={props.image}
                onMouseOver={() => { props.onMouseOver() }}
                onMouseOut={() => { props.onMouseOut() }}
                onClick={() => props.navigate()}
            />
            :
            <UserCircle
                className="size-full cursor-pointer"
                viewBox="25 25 205 205"
                color={colors.gray[700]}
                weight="thin"
                onMouseOver={() => { props.onMouseOver() }}
                onMouseOut={() => { props.onMouseOut() }}
                onClick={() => props.navigate()}
            />
    )
}
import { HTMLAttributes } from "react";

export default function FigCaption(props: HTMLAttributes<HTMLElement>){
    return (
        <figcaption 
            className="
                text-xl
                capitalize
                text-gray-200
                font-semibold
            "
        >
            {props.children}
        </figcaption>
    )
}
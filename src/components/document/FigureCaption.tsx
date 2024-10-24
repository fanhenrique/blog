import { HTMLAttributes } from "react";

export default function FigureCaption(props: HTMLAttributes<HTMLElement>) {
    return (
        <figcaption
            className="
                text-xl
                capitalize
                font-semibold
            "
        >
            {props.children}
        </figcaption>
    )
}
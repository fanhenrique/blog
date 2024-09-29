import { HTMLAttributes } from "react";

export default function FigureTitle(props: HTMLAttributes<HTMLElement>) {
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
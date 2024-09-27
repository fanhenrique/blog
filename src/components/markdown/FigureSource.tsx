import { HTMLAttributes } from "react";

export default function FigureSource(props: HTMLAttributes<HTMLSpanElement>) {
    return <span>Fonte: {props.children}</span>
}
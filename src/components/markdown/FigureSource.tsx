import { HTMLAttributes } from "react";

export default function FigureSource(props: HTMLAttributes<HTMLSpanElement>) {
    return <span className="text-lg text-gray-200">Fonte: {props.children}</span>
}
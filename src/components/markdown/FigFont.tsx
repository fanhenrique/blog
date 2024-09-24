import { HTMLAttributes } from "react";

export default function FigFont(props: HTMLAttributes<HTMLSpanElement>){
    return <span className="font-semibold text-gray-200">Fonte: {props.children}</span>
}
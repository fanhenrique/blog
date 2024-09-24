import { HTMLAttributes } from "react"

export default function Cite(props: HTMLAttributes<HTMLElement>) {
    return <span>[{props.children}]</span>
}

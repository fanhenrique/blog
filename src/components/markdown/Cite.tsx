import { HTMLAttributes } from "react"

export default function Cite(props: HTMLAttributes<HTMLElement>) {
    return <span className="font-normal">[{props.children}]</span>
}

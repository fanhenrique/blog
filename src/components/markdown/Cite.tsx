import { HTMLAttributes } from "react"

export default function Cite(props: HTMLAttributes<HTMLElement>) {

    return <span className="text-sky-600">[{props.children}]</span>
}

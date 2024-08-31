import { HTMLAttributes } from "react"

export default function Cite(props: HTMLAttributes<HTMLElement>) {

    return <div className="inline">&nbsp;[{props.children}]</div>
}

import { HTMLAttributes } from "react";

export default function Anchor(props: HTMLAttributes<HTMLAnchorElement>) {

    return (
        <a
            {...props}
            className="
                w-fit
                text-sky-600
                hover:underline
                decoration-1
                underline-offset-2
                cursor-pointer
            "
        >
            {props.children}
        </a>
    )
}
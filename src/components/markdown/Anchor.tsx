import { HTMLAttributes } from "react";

export default function Anchor(props: HTMLAttributes<HTMLAnchorElement>) {

    return (
        <a
            className="
                w-fit
                text-sky-600
                hover:underline
                decoration-1
                underline-offset-2
                cursor-pointer
            "
            {...props}
        >
            {props.children}
        </a>
    )
}
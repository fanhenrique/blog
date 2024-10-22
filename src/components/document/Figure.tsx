import { HTMLAttributes } from "react";

export default function Figure(props: HTMLAttributes<HTMLElement>) {
    return (
        <figure
            className="
                w-full flex
                flex-col items-center
                gap-y-5
                my-10
            "
            {...props}
        >
            {props.children}
        </figure>
    )
}
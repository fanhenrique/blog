import { HTMLAttributes } from "react";

export default function Figure(props: HTMLAttributes<HTMLElement>) {
    return (
        <figure
            className="
                w-full flex
                flex-col items-center
                mt-10 mb-2
                gap-y-2
            "
            {...props}
        >
            {props.children}
        </figure>
    )
}
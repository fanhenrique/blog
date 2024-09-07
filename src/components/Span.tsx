import { HTMLAttributes } from "react";

export default function Span(props: HTMLAttributes<HTMLSpanElement>) {

    return (
        <span
            {...props}
            className="
                w-fit
                text-gray-200
                font-semibold
                text-lg
            "
        />
    )
}
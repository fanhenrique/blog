import { HTMLAttributes } from "react";

export default function Mark(props: HTMLAttributes<HTMLElement>) {
    return (
        <mark
            className="
                px-0.5
                font-semibold
                text-gray-200
                bg-assistant-color
            "
        >
            {props.children}
        </mark>
    )
}
import { HTMLAttributes } from "react";

export default function Ul(props: HTMLAttributes<HTMLUListElement>) {

    return (
        <ul
            className="
                w-full pl-10
                flex flex-col
                mt-2 mb-5
                gap-y-5
                list-disc
                list-inside
                text-gray-200
            "
        >
            {props.children}
        </ul>

    )
}
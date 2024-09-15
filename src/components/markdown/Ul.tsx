import { HTMLAttributes } from "react";

export default function Ul(props: HTMLAttributes<HTMLUListElement>) {

    return (
        <ul
            className="
                w-full pl-14
                flex flex-col
                mt-2 mb-5
                gap-y-5
                list-disc
                list-outside
                text-gray-200
            "
        >
            {props.children}
        </ul>

    )
}
import { OlHTMLAttributes } from "react";

export default function Ol(props: OlHTMLAttributes<HTMLOListElement>) {

    return (
        <ol
            className="
                w-full pl-14
                flex flex-col
                mt-2 mb-5
                gap-y-5
                list-decimal
                list-outside
            "
        >
            {props.children}
        </ol>
    )
}
import { BlockquoteHTMLAttributes } from "react";

export default function Blockquote(props: BlockquoteHTMLAttributes<HTMLQuoteElement>) {

    return (
        <blockquote
            className="
                h-fit p-2 my-5
                border-primary-color
                border-l-4
                bg-gray-800
            "
            {...props}
        >
            <div className="-mb-5">
                {props.children}
            </div>
        </blockquote>
    )
}
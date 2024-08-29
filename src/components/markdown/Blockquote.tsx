import { BlockquoteHTMLAttributes } from "react";

export default function Blockquote(props: BlockquoteHTMLAttributes<HTMLQuoteElement>) {

    return (
        <blockquote
            className="
                h-fit p-4 my-5
                border-primary-color
                border-l-4
                bg-gray-800
            "
            {...props}
        >
            <div className="-mb-4">
                {props.children}
            </div>
        </blockquote>
    )
}
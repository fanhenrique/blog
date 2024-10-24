import { HTMLAttributes } from "react";

export default function Paragraph(props: HTMLAttributes<HTMLParagraphElement>) {

    return (
        <p className="
                text-justify
                tracking-wide
                leading-relaxed
                mb-5
            "
            {...props}
        >
            {props.children}
        </p>
    )
}

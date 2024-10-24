import { HTMLAttributes } from "react";
import Paragraph from "./Paragraph";

export default function SourceFigure(props: HTMLAttributes<HTMLSpanElement>) {
    return (
        <Paragraph className="
                text-center
                tracking-wide
                leading-relaxed
                mb-10
            "
        >
            Fonte:&nbsp;{props.children}
        </Paragraph>
    )
}
import { HTMLAttributes } from "react";

// internal import 
import Hr from "./Hr";

// Post section
export default function Heading2(props: HTMLAttributes<HTMLHeadingElement>) {

    return (
        <div className="mt-10 mb-1">
            <h2
                className="
                    text-3xl 
                    text-gray-200
                    font-semibold
                    capitalize
                "
                {...props}
            >
                {props.children}
            </h2>
            <Hr />
        </div>
    )
}
import { HTMLAttributes } from "react";

export default function Hr(props: HTMLAttributes<HTMLHRElement>) {

    return <hr {...props} className="h-0.5 bg-gray-700 border-0" />

}
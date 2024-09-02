import { ImgHTMLAttributes } from "react";

export default function Image(props: ImgHTMLAttributes<HTMLImageElement>) {

    return (
        <div className="w-full flex flex-col gap-y-4 items-center my-5">
            <img {...props} />
            <span
                className="
                    w-fit
                    leading-relaxed
                    text-gray-200
                    font-semibold
                    text-xl
                "
            >
                {props.title}
            </span>
        </div>
    )
}

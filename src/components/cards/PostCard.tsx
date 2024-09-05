import { useState } from "react";

// internal imports
import { AttributesPostInteface } from "../../pages/Post"
import AuthorsList from "./AuthorsList";
import TagList from "./TagList";
import CardTitle from "./CardTitle";

export default function PostCard(props: AttributesPostInteface) {

    const [over, setOver] = useState(false)

    return (
        <div className={`
            flex flex-col p-2 gap-y-2
            text-gray-200 
            bg-secondary-color 
            shadow-s
            ${over ? 'scale-[103%]' : ''}`}
        >
            <div className="flex flex-col gap-y-8">

                <div className="flex justify-between">
                    <CardTitle
                        over={over}
                        onMouseOver={() => { setOver(true) }}
                        onMouseOut={() => { setOver(false) }}
                        navigate={`/post/${props.slug}`}
                    >
                        {props.title}
                    </CardTitle>

                    <span className="text-nowrap text-gray-200">
                        {props.date.toLocaleDateString("pt-BR")}
                    </span>
                </div>

                <AuthorsList authors={props.authors} />

            </div>

            <hr className="h-px bg-gray-700 border-0 " />

            <TagList tags={props.tags} />

        </div >

    )
}
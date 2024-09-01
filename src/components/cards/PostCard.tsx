import { useNavigate } from "react-router-dom"
import { useState } from "react";

// internal imports
import { AttributesPostInteface } from "../../pages/Post"
import ListAuthors from "../ListAuthors";
import TagList from "./TagList";

export default function PostCard(props: AttributesPostInteface) {

    const navigate = useNavigate()
    const [over, setHover] = useState(false)

    return (

        <div className={`
            flex flex-col p-2
            text-gray-200 
            bg-secondary-color 
            shadow-s
            ${over ? 'scale-[103%]' : ''}`}
        >
            <div
                className="flex flex-col gap-y-4 cursor-pointer pb-2"
                onMouseOver={() => { setHover(true) }}
                onMouseOut={() => { setHover(false) }}
                onClick={() => navigate(`/post/${props.slug}`)}
            >

                <div className="flex justify-between">
                    <h1 className=
                        {`    
                            w-fit text-2xl md:text-3xl lg:text-5xl  xl:text-5xl 
                            font-semibold 
                            text-left
                            cursor-pointer
                            ${over ? 'text-primary-color' : 'text-gray-200'}
                        `}
                    >
                        {props.title}
                    </h1>
                    <span className="text-nowrap text-gray-200">
                        {props.date.toLocaleDateString("pt-BR")}
                    </span>
                </div>
                <div className="flex flex-col gap-1">
                    <ListAuthors authors={props.authors} />
                </div>
            </div>

            <hr className="h-px bg-gray-700 border-0 " />

            <TagList tags={props.tags} />

        </div >

    )
}
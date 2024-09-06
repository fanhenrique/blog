import { useState } from "react";

// internal imports
import { AttributesPostInteface } from "../../pages/Post"
import AuthorsList from "./AuthorsList";
import TagList from "./TagList";
import CardTitle from "./CardTitle";
import Card from "./Card";
import Hr from "../markdown/Hr";

export default function PostCard(props: AttributesPostInteface) {

    const [over, setOver] = useState(false)

    return (
        <Card over={over}>
            <>
                <div className="flex flex-col gap-y-8">

                    <div className="w-full flex justify-between">
                        <CardTitle
                            over={over}
                            onMouseOver={() => { setOver(true) }}
                            onMouseOut={() => { setOver(false) }}
                            navigate={`/post/${props.slug}`}
                        >
                            {props.title}
                        </CardTitle>

                        <span className="w-fit h-fit text-gray-200">
                            {props.date.toLocaleDateString("pt-BR")}
                        </span>
                    </div>

                    <AuthorsList authors={props.authors} />

                </div>

                <Hr />

                <TagList tags={props.tags} />
            </>
        </Card>
    )
}
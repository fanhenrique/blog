import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal imports
import AuthorsList from "./AuthorsList";
import TagList from "./TagList";
import CardTitle from "./CardTitle";
import Card from "./Card";
import Hr from "../document/Hr";
import { PostI } from "../../pages/Post";

export default function PostCard(props: PostI) {

    const navigate = useNavigate()
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
                            title={props.metadata.title}
                            navigate={() => navigate(`/post/${props.metadata.slug}`)}
                        >
                            {props.metadata.title}
                        </CardTitle>

                        <span className="w-fit h-fit text-gray-200">
                            {props.metadata.date.toLocaleDateString("pt-BR")}
                        </span>
                    </div>
                    <AuthorsList authors={props.metadata.authors} />
                </div>
                <Hr />
                <TagList tags={props.metadata.tags} />
            </>
        </Card >
    )
}
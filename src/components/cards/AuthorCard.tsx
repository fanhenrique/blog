import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Internal imports
import TagList from "./TagList"
import CardTitle from "./CardTitle"
import Card from "./Card"
import Hr from "../markdown/Hr"
import SearchByAuthor from "./SearchByAuthor"
import AuthorImage from "./AuthorImage"
import { AuthorI } from "../../pages/Authors"

export default function AuthorCard(props: AuthorI) {

    const navigate = useNavigate()
    const [over, setOver] = useState(false)

    return (
        <Card over={over}>
            <>
                <div className="flex flex-col">

                    <div className="flex gap-x-4">
                        <div className="w-1/5">
                            <AuthorImage
                                image={props.metadata.image}
                                onMouseOver={() => { setOver(true) }}
                                onMouseOut={() => { setOver(false) }}
                                navigate={() => navigate(`/author/${props.metadata.slug}`, { state: props })}
                            />
                        </div>
                        <div className="w-full flex flex-col justify-between">
                            <CardTitle
                                over={over}
                                onMouseOver={() => { setOver(true) }}
                                onMouseOut={() => { setOver(false) }}
                                title={props.metadata.author}
                                navigate={() => navigate(`/author/${props.metadata.slug}`, { state: props })}
                            >
                                {props.metadata.author}
                            </CardTitle>
                            <div className="w-full flex justify-end">
                                <SearchByAuthor search={props.metadata.author} />
                            </div>
                        </div>
                    </div>

                </div>

                <Hr />

                <TagList tags={props.metadata.tags} />
            </>
        </Card >
    )
}
import { useState } from "react"

// Internal imports
import { AuthorsAttributesInterface } from "../../pages/Author"
import TagList from "./TagList"
import CardTitle from "./CardTitle"
import Card from "./Card"
import Hr from "../markdown/Hr"
import SearchByAuthor from "./SearchByAuthor"
import AuthorImage from "./AuthorImage"

export default function AuthorCard(props: AuthorsAttributesInterface) {

    const [over, setOver] = useState(false)

    return (
        <Card over={over}>
            <>
                <div className="flex flex-col">

                    <div className="flex gap-x-4">
                        <div className="w-1/5">
                            <AuthorImage
                                image={props.image}
                                onMouseOver={() => { setOver(true) }}
                                onMouseOut={() => { setOver(false) }}
                                navigate={`/author/${props.slug}`}
                            />
                        </div>
                        <div className="w-full flex flex-col justify-between">
                            <CardTitle
                                over={over}
                                onMouseOver={() => { setOver(true) }}
                                onMouseOut={() => { setOver(false) }}
                                navigate={`/author/${props.slug}`}
                            >
                                {props.author}
                            </CardTitle>
                            <div className="w-full flex justify-end">
                                <SearchByAuthor search={props.author} />
                            </div>
                        </div>
                    </div>

                </div>

                <Hr />

                <TagList tags={props.tags} />
            </>
        </Card >
    )
}
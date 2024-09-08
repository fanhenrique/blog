import { useState } from "react"
import { UserCircle } from "@phosphor-icons/react"

import { AuthorsAttributesInterface } from "../../pages/Author"
import TagList from "./TagList"
import CardTitle from "./CardTitle"
import Card from "./Card"
import Hr from "../markdown/Hr"
import SearchByAuthor from "./SearchByAuthor"
import colors from "tailwindcss/colors"

export default function AuthorCard(props: AuthorsAttributesInterface) {

    const [over, setOver] = useState(false)
    console.log(props.foto)

    return (
        <Card over={over}>
            <>
                <div className="flex flex-col">

                    <div className="flex gap-x-4">
                        <div className="w-1/5">
                            {props.foto ?
                                <img className="w-full rounded-full" src={props.foto} />
                                :
                                <UserCircle
                                    className="size-full"
                                    viewBox="25 25 205 205"
                                    color={colors.gray[700]}
                                    weight="thin"
                                />
                            }
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
// Internal imports
import Tag from "./Tag"

interface TagListProps {
    tags: string[]
}

export default function TagList(props: TagListProps) {

    return (
        <div className="flex flex-row flex-wrap gap-x-1.5 pt-2 ">
            {props.tags.map((tag: string, i: number) => {
                return (
                    <Tag key={tag + i}>{tag}</Tag>
                )
            })}
        </div>
    )
}
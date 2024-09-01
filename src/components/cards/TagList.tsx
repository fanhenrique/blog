// Internal imports
import Tag from "./Tag"

interface TagListProps {
    tags: string[]
}

export default function TagList(props: TagListProps) {

    return (
        <div className="flex flex-row flex-wrap gap-x-1.5 pt-2  text-primary-color">
            {props.tags.map((tag: string, i: number) => {
                console.log(tag)
                return (
                    <Tag key={tag + i}>{tag}</Tag>
                )
            })}
        </div>
    )
}
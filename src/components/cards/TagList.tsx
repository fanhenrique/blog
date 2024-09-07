// Internal imports
import ButtonSearch from "../ButtonSearch"

interface TagListProps {
    tags: string[]
}

export default function TagList(props: TagListProps) {

    return (
        <div className="flex flex-wrap gap-x-1.5">
            {props.tags.map((tag: string, i: number) => {
                return (
                    <ButtonSearch
                        key={tag + i}
                        search={tag}
                        className="
                            text-primary-color
                            hover:bg-primary-color
                            hover:text-gray-200
                            text-nowrap
                            py-0.5 px-1 text-base
                            font-semibold
                            rounded-lg
                        "
                    >
                        {tag}
                    </ButtonSearch>
                )
            })}
        </div>
    )
}
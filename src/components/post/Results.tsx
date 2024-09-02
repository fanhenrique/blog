import { FuseResult } from "fuse.js"

// Internal imports
import CleanSearch from "../CleanSearch"
import { PostInterface } from "../../pages/Post"
import PostCard from "../cards/PostCard"

interface ResultsProps {
    results: FuseResult<PostInterface>[]
}

export default function Results(props: ResultsProps) {

    return (
        <div className='flex flex-col gap-y-5'>
            <CleanSearch />
            {props.results.map((r: FuseResult<PostInterface>, i: number) => {
                return (
                    <PostCard
                        key={r.item.attributes.title + i}
                        {...r.item.attributes}
                    />
                )
            })}
        </div>
    )
}
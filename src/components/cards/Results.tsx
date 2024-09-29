import { FuseResult } from "fuse.js"

// Internal imports
import CleanSearch from "../CleanSearch"
import PostCard from "./PostCard"
import { PostI } from "../../pages/Home"

interface ResultsProps {
    results: FuseResult<PostI>[]
}

export default function Results(props: ResultsProps) {

    return (
        <>
            <CleanSearch />
            {props.results.map((result: FuseResult<PostI>, i: number) => {
                return (
                    <PostCard
                        key={result.item.metadata.title + i}
                        {...result.item}
                    />
                )
            })}
        </>
    )
}
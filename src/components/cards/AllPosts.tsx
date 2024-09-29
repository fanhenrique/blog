// Internal imports
import { PostI } from "../../pages/Home"
import PostCard from "./PostCard"
import Span from "../Span"

interface AllPostsProps {
    posts: PostI[]
}

export default function AllPosts(props: AllPostsProps) {

    return (
        <>
            <Span>Posts</Span>
            {props.posts.map((post: PostI, i: number) => {
                return (
                    <PostCard
                        key={post.metadata.title + i}
                        {...post}
                    />
                )
            })}
        </>
    )
}
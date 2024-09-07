// Internal imports
import { PostInterface } from "../../pages/Post"
import PostCard from "../cards/PostCard"
import Span from "../Span"

interface AllPostsProps {
    posts: PostInterface[]
}

export default function AllPosts(props: AllPostsProps) {

    return (
        <div className='flex flex-col gap-y-5'>
            <Span>Posts</Span>
            {props.posts.map((post: PostInterface, i: number) => {
                return (
                    <PostCard
                        key={post.attributes.title + i}
                        {...post.attributes}
                    />
                )
            })}
        </div>
    )
}
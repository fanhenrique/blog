// Internal imports
import { PostInterface } from "../../pages/Post"
import PostCard from "../cards/PostCard"

interface AllPostsProps {
    posts: PostInterface[]
}

export default function AllPosts(props: AllPostsProps) {

    return (
        <div className='flex flex-col gap-y-5'>
            <span className='w-fit
                text-gray-200
                font-semibold
                text-lg'
            >
                Posts
            </span>
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
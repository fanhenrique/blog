//internal imports
import AuthorsList from "../cards/AuthorsList"
import Hr from "./Hr"

interface PostHeaderProps {
    authors: string[] | undefined
    date: Date | undefined
}

export default function PostHeader(props: PostHeaderProps) {

    return (
        <div className='w-full flex flex-col gap-y-1'>
            <div className='w-full flex justify-between'>
                <AuthorsList authors={props.authors} />
                <span className='text-nowrap text-gray-200'>
                    {props.date?.toLocaleDateString("pt-BR")}
                </span>
            </div>
            <Hr />
        </div>
    )
}

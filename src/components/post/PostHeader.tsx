//internal imports
import AuthorsList from "../cards/AuthorsList"
import Hr from "../markdown/Hr"

interface PostHeaderProps {
    authors: string[] | undefined
    date: Date | undefined
}

export default function PostHeader(props: PostHeaderProps) {

    return (
        <div className='w-full flex flex-col gap-1'>
            <div className='w-full flex justify-between text-gray-200'>
                <AuthorsList authors={props.authors} />
                <span className='text-nowrap text-gray-200'>
                    {props.date?.toLocaleDateString("pt-BR")}
                </span>
            </div>
            <Hr />
        </div>
    )
}

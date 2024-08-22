//internal imports
import ListAuthors from "./ListAuthors"

interface HeaderPostProps {
    authors: string[] | undefined
    date: Date | undefined
}

export default function HeaderPost(props: HeaderPostProps) {

    return (
        <div className='w-full flex flex-col'>
            <div className='w-full flex justify-between text-gray-200'>
                <ListAuthors authors={props.authors} />
                <span className='text-nowrap text-gray-200'>
                    {props.date?.toLocaleDateString("pt-BR")}
                </span>
            </div>
            <hr className='h-0.5 bg-gray-700 border-0' />
        </div>
    )
}

interface AuthorsListProps {
    authors: string[] | undefined
}

export default function AuthorsList(props: AuthorsListProps) {
    return (
        <div className="flex">
            <span>Autor{props.authors ? props.authors.length > 1 ? 'es' : '' : <></>}:&nbsp;</span>
            <div className="flex gap-x-2 flex-wrap font-semibold">
                {props.authors?.map((author: string, i: number) => {
                    return (
                        <span
                            key={author + i}
                            className="
                            hover:text-primary-color
                            cursor-pointer
                            hover:underline 
                            underline-offset-2"
                        >
                            {author}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}
import GoAuthorPage from "./GoAuthorPage"

interface AuthorsListProps {
    authors: string[] | undefined
}

export default function AuthorsList(props: AuthorsListProps) {
    return (
        <div className="flex">
            <span>Autor{props.authors ? props.authors.length > 1 ? 'es' : '' : <></>}:&nbsp;</span>
            <div className="flex gap-x-4 flex-wrap font-semibold">
                {props.authors?.map((author: string, i: number) => {
                    return (
                        <GoAuthorPage key={author + i}>{author}</GoAuthorPage>
                    )
                })}
            </div>
        </div>
    )
}
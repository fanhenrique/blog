import ButtonSearch from "../ButtonSearch";

interface SearchByAuthorProps {
    search: string | undefined
}

export default function SearchByAuthor(props: SearchByAuthorProps) {

    return (
        <ButtonSearch
            search={props.search}
            className="
                w-fit
                text-gray-200
                hover:text-primary-color
                cursor-pointer
                hover:underline 
                underline-offset-2
                font-semibold 
            "
        >
            Postagens do autor
        </ButtonSearch>
    )
}
import ButtonSearch from "../ButtonSearch";

interface TagProps {
    children: string
}

export default function Tag(props: TagProps) {

    return (
        <ButtonSearch
            search={props.children}
            className="
                text-primary-color
                hover:bg-primary-color
                hover:text-gray-200
                text-nowrap
                py-0.5 px-1 text-base
                font-semibold
                rounded-lg
            "
        >
            {props.children}
        </ButtonSearch>
    )
}
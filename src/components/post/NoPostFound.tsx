// Internal imports
import CleanSearch from "../CleanSearch";

export default function NoPostFound() {

    return (
        <>
            <CleanSearch />
            <span
                className="
                    text-red-600 
                    font-semibold 
                    text-xl
                "
            >
                Nenhum post encontrado
            </span>
        </>
    )
}
// Internal imports
import CleanSearch from "./CleanSearch";

export default function NoPostFound() {

    return (
        <div className='flex flex-col gap-y-5'>
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
        </div>
    )
}
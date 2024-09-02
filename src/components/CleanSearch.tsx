import { useContext } from "react";

// Internal imports
import { RefContext } from "./RefProvider";

export default function CleanSearch() {

    const context = useContext(RefContext);

    return (
        <button
            className="w-fit
                text-gray-200
                font-semibold
                text-lg
                hover:underline
                hover:text-primary-color
            "
            onClick={() => { context?.setInputValue('') }}
        >
            Todos os posts
        </button>
    )
}
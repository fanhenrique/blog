import { MagnifyingGlass } from "@phosphor-icons/react"
import { InputHTMLAttributes, useContext } from "react"
import colors from "tailwindcss/colors";

// internal imports
import { RefContext } from "./RefProvider";

export default function Search(props: InputHTMLAttributes<HTMLInputElement>) {

    const context = useContext(RefContext);

    const handleInputChange = () => {
        if (context?.inputRef?.current)
            context.setInputValue(context.inputRef.current.value)
    }

    return (
        <div className="w-fit flex flex-row justify-end">
            <div className='flex items-center relative'>
                <MagnifyingGlass className='absolute pl-1 pointer-events-none' size={26} weight="bold" color={colors.gray[500]} />
                <input
                    ref={context?.inputRef}
                    type='text'
                    name='search'
                    value={context?.inputValue}
                    onChange={handleInputChange}
                    className={`
                        h-9 w-full
                        pl-7 text-xl
                        border border-gray-700 rounded-md
                        bg-secondary-color text-gray-200
                        placeholder-gray-500 font-semibold
                        focus:outline-primary-color
                        focus:outline
                        focus:outline-1
                        focus:border-primary-color
                    `}
                    placeholder='Pesquisar'
                    {...props}
                />
            </div>
        </div>
    )
}
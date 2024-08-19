import { MagnifyingGlass } from "@phosphor-icons/react"
import { InputHTMLAttributes, useContext } from "react"
import colors from "tailwindcss/colors";

// internal imports
import { RefContext } from "./RefProvider";

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> { }

export default function Search(props: SearchProps) {

    const context = useContext(RefContext);

    const handleInputChange = () => {
        if (context?.inputRef?.current)
            context.setInputValue(context.inputRef.current.value)
    }

    return (
        <div className='relative flex flex-row items-center gap-2'>
            <input
                ref={context?.inputRef}
                type='text'
                name='search'
                onChange={handleInputChange}
                className={
                    `${props.className}
                    min-w-fit h-9 w-full
                    pl-10 text-xl
                    border border-gray-700 rounded-md  
                    bg-secondary-color text-gray-200       
                    placeholder-gray-500 font-semibold
                    focus:outline-primary-color
                    focus:outline
                    focus:outline-1
                    focus:border-primary-color
                    `
                }
                placeholder={props.placeholder}
            />
            <MagnifyingGlass className='absolute pl-2 pointer-events-none' size={32} weight="bold" color={colors.gray[500]} />
        </div>
    )
}
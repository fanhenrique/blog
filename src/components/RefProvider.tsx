import { createContext, RefObject, useRef, useState } from "react"

interface RefContextType {
    inputRef: RefObject<HTMLInputElement>;
    inputValue: string | undefined;
    setInputValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const RefContext = createContext<RefContextType | null>(null)

export default function RefProvider(props: { children: JSX.Element }) {

    const inputRef = useRef<HTMLInputElement>(null)

    const [inputValue, setInputValue] = useState<string | undefined>('')

    return (
        <RefContext.Provider value={{ inputRef, inputValue, setInputValue }}>
            {props.children}
        </RefContext.Provider>
    )
}
import { createContext, RefObject, useRef, useState } from "react"

interface RefContextType {
    inputRef: RefObject<HTMLInputElement>;
    inputValue: string;
    setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

export const RefContext = createContext<RefContextType | null>(null)

export default function RefProvider(props: { children: JSX.Element }) {

    const inputRef = useRef<HTMLInputElement>(null)

    const [inputValue, setInputValue] = useState<string>('')

    return (
        <RefContext.Provider value={{ inputRef, inputValue, setInputValue }}>
            {props.children}
        </RefContext.Provider>
    )
}
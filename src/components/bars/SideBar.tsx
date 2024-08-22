import { useRef } from "react";
import { MouseEvent } from "react";

//interl imports 
import ButtonMenu from "./ButtonMenu";

interface SideBarProps {
    open: boolean
    onclick: () => void;
}

export default function SideBar(props: SideBarProps) {

    const refInside = useRef<HTMLDivElement>(null);

    const handleInsideClick = (event: MouseEvent<HTMLDivElement>) => {
        if (refInside.current == event.target)
            props.onclick()
    }

    return (
        <div className={`${props.open ? 'visible' : 'invisible'} absolute z-50 w-full h-full flex`}  >
            <div
                ref={refInside}
                className='
                    w-full
                    cursor-pointer
                    bg-black
                    bg-opacity-50'
                onClick={handleInsideClick}
            >
                <aside className={
                    `${props.open ? 'w-[50%] sm:w-[50%] md:w-[25%]' : 'w-0'} 
                    h-fit transition ease-linear 
                    min-w-fit px-2
                    cursor-default
                    bg-secondary-color`}
                >
                    <div className='w-full flex flex-col divide-y divide-gray-700'>
                        <ButtonMenu navigate='/'>Home</ButtonMenu>
                        <ButtonMenu navigate='/about'>Sobre</ButtonMenu>
                        <ButtonMenu navigate='/authors'>Autores</ButtonMenu>
                        <ButtonMenu navigate='/contact'>Contato</ButtonMenu>
                    </div>
                </aside >
            </div>
        </div >
    )
}
import { useRef } from "react";
import { MouseEvent } from "react";

//interl imports 
import Button from "./Button";

interface SideBarProps {
    showSideBar: boolean
    closeSideBar: () => void;
}

export default function SideBar(props: SideBarProps) {

    const refInside = useRef<HTMLDivElement>(null);

    const handleInsideClick = (event: MouseEvent<HTMLDivElement>) => {
        if (refInside.current == event.target)
            props.closeSideBar()
    }

    return (
        <div className={`${props.showSideBar ? 'visible' : 'invisible'} fixed z-50 w-full h-full flex`}  >
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
                    `${props.showSideBar ? 'w-[50%] sm:w-[50%] md:w-[25%]' : 'w-0'} 
                    h-fit transition ease-linear 
                    min-w-fit px-2
                    cursor-default
                    bg-secondary-color`}
                >
                    <div className='w-full flex flex-col divide-y divide-gray-700'>
                        <Button navigate='/' closeSideBar={props.closeSideBar}>Home</Button>
                        <Button navigate='/about' closeSideBar={props.closeSideBar}>Sobre</Button>
                        <Button navigate='/authors' closeSideBar={props.closeSideBar}>Autores</Button>
                    </div>
                </aside >
            </div>
        </div >
    )
}
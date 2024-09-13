import { useRef } from "react";
import { MouseEvent } from "react";

//interl imports 
import SideBarButton from "./SideBarButton";

interface SideBarProps {
    showSideBar: boolean
    onSideBar: () => void
}

export default function SideBar(props: SideBarProps) {

    const refInside = useRef<HTMLDivElement>(null);

    const handleInsideClick = (event: MouseEvent<HTMLDivElement>) => {
        if (refInside.current == event.target)
            props.onSideBar()
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
                        <SideBarButton navigate='/' closeSideBar={props.onSideBar} >Home</SideBarButton>
                        <SideBarButton navigate='/authors' closeSideBar={props.onSideBar} >Autores</SideBarButton>
                    </div>
                </aside >
            </div>
        </div >
    )
}
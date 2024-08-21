import { useState } from "react";

// internal imports
import Footer from "./bars/Footer"
import SideBar from "./bars/SideBar";
import TopBar from "./bars/TopBar"

interface LayoutProps {
    children: JSX.Element
}

export default function Layout(props: LayoutProps) {

    const [open, setOpen] = useState(false);

    return (
        <div className="relative">

            <SideBar open={open} onclick={() => setOpen(false)} />

            <div className="w-full flex min-w-fit flex-col gap-y-5 items-center bg-backgroud-color">
                <div className='w-full min-h-screen gap-y-5 flex flex-col items-center'>
                    <TopBar open={open} onOpen={() => setOpen(!open)} />
                    <div className="px-1 w-full sm:w-full md:w-[95%] lg:w-4/5 xl:w-8/12 2xl:w-3/5">
                        {props.children}
                    </div>
                </div>
                <Footer />
            </div>
        </div >
    )
}
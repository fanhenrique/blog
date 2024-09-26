import { useState } from "react";

// internal imports
import Footer from "./bars/Footer"
import SideBar from "./bars/SideBar";
import TopBar from "./bars/TopBar"

interface LayoutProps {
    children: JSX.Element
    showSearch?: boolean
}

export default function Layout(props: LayoutProps) {

    const [showSideBar, setShowSideBar] = useState(false);

    return (
        <div className="w-screen">

            <SideBar showSideBar={showSideBar} onSideBar={() => setShowSideBar(!showSideBar)} />

            <div className="w-full flex flex-col gap-y-5 items-center bg-backgroud-color">
                <div className='w-full min-h-screen gap-y-5 flex flex-col items-center'>
                    <TopBar
                        showSearch={props.showSearch}
                        onSideBar={() => setShowSideBar(!showSideBar)}
                    />
                    <div className="px-1 md:px-0 w-full sm:w-full md:w-[95%] lg:w-4/5 xl:w-8/12 2xl:w-3/5">
                        {props.children}
                    </div>
                </div>
                <Footer />
            </div>
        </div >
    )
}
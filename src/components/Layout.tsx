// internal imports
import Footer from "./bars/Footer"
import TopBar from "./bars/TopBar"

interface LayoutProps {
    children: JSX.Element
}

export default function Layout(props: LayoutProps) {
    return (
        <div className="w-full flex flex-col gap-4 bg-backgroud-color">
            <div
                className='w-full min-h-screen gap-4 flex flex-col items-center'
            >
                <TopBar />
                <div className="px-2 h-full w-full sm:w-full md:w-[95%] lg:w-4/5 xl:w-8/12 2xl:w-3/5 flex justify-center grow">
                    {props.children}
                </div>
            </div>
            <Footer />
        </div>
    )
}
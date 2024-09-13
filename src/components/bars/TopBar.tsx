// internal import
import Button from "./Button"
import Search from "../Search"
import OpenSideBar from "./OpenSideBar";
import useScreenSize from "../hooks/useScreenSize";
import Title from "./Title";

interface TopBarProps {
    showSearch: boolean | undefined;
    onSideBar: () => void;
}

export default function TopBar(props: TopBarProps) {

    const screenSize = useScreenSize()

    return (
        <div className="z-40 top-0 w-full h-20 flex items-center justify-center px-2 md:px-3 lg:px-5 bg-secondary-color">
            {screenSize.width < 1024 ?
                <>
                    <div className="w-full flex">
                        <OpenSideBar className='grow w-2/5' onClick={props.onSideBar} />
                        <div className='grow-0 w-1/5 '>
                            <Title />
                        </div>
                        <div className="grow-0 w-2/5">
                            {props.showSearch ? <Search /> : <></>}
                        </div>
                    </div>

                </>
                :
                <>
                    <div className='w-1/3 flex justify-start'>
                        <Title />
                    </div>
                    <div className="w-1/3 lg:gap-x-28 flex justify-center">
                        <Button navigate="/">Home</Button>
                        <Button navigate="/authors">Autores</Button>
                    </div>

                    <div className="w-1/3 flex justify-end">
                        <div className="w-full lg:w-3/4">
                            {props.showSearch ? <Search /> : <></>}
                        </div>
                    </div>

                </>
            }

        </div >
    )
}
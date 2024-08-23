// internal import
import ButtonMenu from "./ButtonMenu"
import Search from "../Search"
import OpenSideBar from "./OpenSideBar";
import useScreenSize from "../hooks/useScreenSize";
import Title from "./Title";

interface TopBarProps {
    showSearch: boolean;
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
                            {props.showSearch ? <Search /> : null}
                        </div>
                    </div>

                </>
                :
                <>
                    <div className='w-2/6 justify-start flex'>
                        <Title />
                    </div>
                    <div className="w-3/6 gap-x-5 lg:gap-x-10 flex justify-center">
                        <ButtonMenu navigate="/">Home</ButtonMenu>
                        <ButtonMenu navigate="/about">Sobre</ButtonMenu>
                        <ButtonMenu navigate="/authors">Autores</ButtonMenu>
                        <ButtonMenu navigate="/contact">Contato</ButtonMenu>
                    </div>

                    <div className="w-2/6 flex justify-end">
                        <div className="w-4/5">
                            {props.showSearch ? <Search /> : null}
                        </div>
                    </div>

                </>
            }

        </div >
    )
}
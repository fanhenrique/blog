import { Sun } from "@phosphor-icons/react"
import colors from "tailwindcss/colors"

// internal import
import ButtonMenu from "./ButtonMenu"
import Search from "../Search"

export default function TopBar() {

    return (
        <div className="sticky z-50 top-0 w-full h-20 flex items-center justify-center px-5 bg-secondary-color">
            <div className="w-1/3">
                <span className="text-primary-color text-2xl font-bold pointer-events-none">blog</span>
            </div>
            <div className="w-1/3 gap-x-14 flex justify-center">
                <ButtonMenu navigate="/">Home</ButtonMenu>
                <ButtonMenu navigate="/about">Sobre</ButtonMenu>
                <ButtonMenu navigate="/authors">Autores</ButtonMenu>
                <ButtonMenu navigate="/contact">Contato</ButtonMenu>
            </div>
            <div className="w-1/3 gap-x-5 flex items-center justify-end">
                <div className="flex flex-row">
                    <Search placeholder="Pesquisar" />
                </div>
                <Sun size={28} color={colors.gray[200]} />
            </div>

        </div >
    )
}
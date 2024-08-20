import Title from "./Title"

export default function Footer() {

    return (
        <div className="w-full h-32 flex flex-col items-center justify-center bg-secondary-color text-gray-200">
            <Title textSize='text-xl' />
            <span>
                © 2024. Todos os direitos reservados
            </span>
        </div >
    )
}
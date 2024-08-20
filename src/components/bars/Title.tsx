interface TitleProps {
    textSize?: string
}

export default function Title({ textSize = 'text-3xl' }: TitleProps) {
    return (
        <span className={`
            ${textSize}
            text-primary-color 
            font-black 
            pointer-events-none
            `}
        >
            blog
        </span >
    )
}
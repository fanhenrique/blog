interface CardProps {
    children: JSX.Element
    over: boolean
}

export default function Card(props: CardProps) {

    return (
        <div className={`
            flex flex-col p-2 gap-y-2
            bg-secondary-color
            shadow-s
            ${props.over ? 'scale-[102%]' : ''}`}
        >
            {props.children}
        </div>
    )
}
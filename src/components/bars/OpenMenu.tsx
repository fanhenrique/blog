import colors from "tailwindcss/colors";
import { List } from "@phosphor-icons/react";

interface OpenMenuProps {
    className?: string;
    size?: number;
    onclick: () => void;
}

export default function OpenMenu(props: OpenMenuProps) {

    return (
        <button
            className={`w-fit outline-none ${props.className}`}
            onClick={() => props.onclick()}
        >
            <List size={32} color={colors.gray[500]} weight='regular' />
        </button>
    );
}
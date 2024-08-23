import colors from "tailwindcss/colors";
import { List } from "@phosphor-icons/react";

interface OpenSideBarProps {
    className?: string;
    size?: number;
    onClick: () => void;
}

export default function OpenSideBar(props: OpenSideBarProps) {

    return (
        <button
            className={`w-fit outline-none ${props.className}`}
            onClick={() => props.onClick()}
        >
            <List size={32} color={colors.gray[500]} weight='regular' />
        </button>
    );
}
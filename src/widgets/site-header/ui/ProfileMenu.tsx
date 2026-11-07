import { Link } from "react-router"
import { Popover } from "../../../shared/ui/popover"

type ProfilePanelProps = {
    onClose: () => void
}

export function ProfilePanel({ onClose }: ProfilePanelProps) {
    return (
        <Popover
            label="Профиль"
            placement='top-right'
            onClose={onClose}
        >
            <Link to="/profile" onClick={onClose}>Профиль</Link>
            <button>Редактор</button>
            <button>Выход</button>
        </Popover>
    )
}
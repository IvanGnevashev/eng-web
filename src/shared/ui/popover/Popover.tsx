import type { KeyboardEvent, ReactNode } from "react"
import styles from './Popover.module.css'

type PopoverProps = {
    children: ReactNode
    label: string
    placement: 'top-left' | 'top-right'
    onClose: () => void
}

export function Popover({children, label, placement, onClose}: PopoverProps) {
    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
        if (event.key !== 'Escape') return
        event.stopPropagation()
        onClose()
    }

    return (
        <section
            className={styles.popover}
            aria-label={label}
            data-placement={placement}
            onKeyDown={handleKeyDown}
        >
            {children}
        </section>
    )
}
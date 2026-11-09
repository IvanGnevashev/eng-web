import { type Editor } from "@tiptap/react"
import { Button } from "../button"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import controls from './EditorControls.module.css'
import styles from './HighlightDropdown.module.css'

type HighlightDropdownProps = {
    editor: Editor,
}

export function HighlightDropdown({editor}: HighlightDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const highlightColors = [
        '#fef08a',
        '#fed7aa',
        '#bbf7d0',
        '#bfdbfe',
        '#ddd6fe',
        '#fbcfe8',
        ]
    
    const dropdownRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)

    function selectColor(color: string) {
        editor.chain().focus().setHighlight({color}).run()
        setIsOpen(false)
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        if (!isOpen || event.key !== 'Escape') return

        event.stopPropagation()
        setIsOpen(false)
        triggerRef.current?.focus()
    }

    useEffect(() => {
        if (isOpen === false) {
            return
        }

        function handlePointerDown(event: PointerEvent) {
            const dropdown = dropdownRef.current
            const target = event.target

            if (!dropdown || !(target instanceof Node)) return
            if (!dropdown.contains(target)) setIsOpen(false)
        }

        document.addEventListener('pointerdown', handlePointerDown)

        return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [isOpen])

    return (
        <div className={styles.container} ref={dropdownRef} onKeyDown={handleKeyDown}>
            <Button
                type="button"
                aria-expanded={isOpen}
                aria-label="Маркер"
                onClick={() => setIsOpen(prev => !prev)}
                className={`${controls.button} ${controls.iconButton}`}
                ref={triggerRef}
            >
                C
            </Button>
            {isOpen && (
                <ul className={styles.options}>
                    {highlightColors.map((color) => (
                        <li key={color}>
                            <Button
                                type="button"
                                className={`${controls.button} ${controls.iconButton} ${styles.swatch}`}
                                onClick={() => selectColor(color)}
                                style={{ backgroundColor: color }}
                                aria-label={`Цвет маркера: ${color}`}
                            >
                            </Button>
                        </li>
                    ))}

                    <li key={1}>
                        <Button
                            type="button"
                            className={`${controls.button} ${controls.iconButton} ${styles.swatch}`}
                            onClick={() => {
                                editor.chain().focus().unsetHighlight().run()
                                setIsOpen(false)
                            }}
                            aria-label="Снять маркер"
                        >∅
                        </Button>
                    </li>
                </ul>
            )}
        </div>
    )
}
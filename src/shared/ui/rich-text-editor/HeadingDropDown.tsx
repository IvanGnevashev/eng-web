import { type Editor, useEditorState } from "@tiptap/react"
import { Button } from "../button"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import controls from './EditorControls.module.css'
import styles from './HeadingDropdown.module.css'

type HeadingDropDownProps = {
    editor: Editor,
}

export function HeadingDropdown({editor}: HeadingDropDownProps) {
    const [isOpen, setIsOpen] = useState(false);
    
    const dropdownRef = useRef<HTMLDivElement>(null)
    const triggerRef = useRef<HTMLButtonElement>(null)

    const editorState = useEditorState({
        editor,
        selector: ({editor}) => ({
            isH1: editor.isActive('heading', {level: 1}),
            isH2: editor.isActive('heading', {level: 2}),
            isH3: editor.isActive('heading', {level: 3}),
            isParagraph: editor.isActive('paragraph'),
        })
    })

    const headingSymbol = editorState.isH1
        ? 'H₁'
        : editorState.isH2
            ? 'H₂'
            :editorState.isH3
                ? 'H₃'
                : '¶'

    const headingLabel = {
        'H₁': 'заголовок 1',
        'H₂': 'заголовок 2',
        'H₃': 'заголовок 3',
        '¶': 'обычный текст',
    }[headingSymbol]

    function selectBlock(level: 1 | 2 | 3 | null) {
        const chain = editor.chain().focus()

        if (level === null) {
            chain.setParagraph().run()
        } else {
            chain.setHeading({level}).run()
        }

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
                aria-label={`Тип блока: ${headingLabel}`}
                onClick={() => setIsOpen(prev => !prev)}
                className={`${controls.button} ${controls.iconButton}`}
                ref={triggerRef}
            >
                {headingSymbol}
            </Button>
            {isOpen && (
                <ul className={styles.options}>
                    <li>
                        <Button type="button" className={`${controls.button} ${controls.iconButton}`} onClick={() => selectBlock(null)} aria-pressed={editorState.isParagraph}>
                            ¶ Обычный текст
                        </Button>
                    </li>
                    <li>
                        <Button type="button" className={`${controls.button} ${controls.iconButton}`} onClick={() => selectBlock(1)} aria-pressed={editorState.isH1}>
                            H₁ Заголовок 1
                        </Button>
                    </li>
                    <li>
                        <Button type="button" className={`${controls.button} ${controls.iconButton}`} onClick={() => selectBlock(2)} aria-pressed={editorState.isH2}>
                            H₂ Заголовок 2
                        </Button>
                    </li>
                    <li>
                        <Button type="button" className={`${controls.button} ${controls.iconButton}`} onClick={() => selectBlock(3)} aria-pressed={editorState.isH3}>
                            H₃ Заголовок 3
                        </Button>
                    </li>
                </ul>
            )}
        </div>
    )
}
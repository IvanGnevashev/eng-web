import { useEditorState, type Editor } from "@tiptap/react";
import { Button } from "../button";

import styles from "./EditorToolbar.module.css"
import controls from './EditorControls.module.css'
import { HeadingDropdown } from "./HeadingDropDown";
import { HighlightDropdown } from "./HighlightDropdown";

type EditorToolbarProps = {
    editor: Editor,
}

export function EditorToolbar({editor}: EditorToolbarProps) {
    const editorState = useEditorState({
        editor,
        selector: ({editor})=>({
            isBold: editor.isActive('bold'),
            isItalic: editor.isActive('italic'),
            isUnderline: editor.isActive('underline'),
            isBulletList: editor.isActive('bulletList'),
            isOrderList: editor.isActive('orderedList'),
            canUndo: editor.can().undo(),
            canRedo: editor.can().redo(),
            isAlignLeft: editor.isActive({ textAlign: 'left' }),
            isAlignCenter: editor.isActive({ textAlign: 'center' }),
            isAlignRight: editor.isActive({ textAlign: 'right' }),
            isAlignJustify: editor.isActive({ textAlign: 'justify' }),
        })
    })

    return (
        <>
        <div
            className={styles.toolbar}
            role="group"
            aria-label="Инструменты форматирования текста"
        >
            <div className={styles.group} role="group" aria-label="История">
                <Button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    className={`${controls.button} ${controls.iconButton}`}
                    aria-label="Отменить изменение"
                    disabled={!editorState.canUndo}
                >
                    ↶
                </Button>
                <Button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    className={`${controls.button} ${controls.iconButton}`}
                    aria-label="Вернуть отменённое изменение"
                    disabled={!editorState.canRedo}
                >
                    ↷
                </Button>
            </div>
            <HeadingDropdown editor={editor} />
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                aria-pressed={editorState.isBold}
                className={`${controls.button} ${controls.iconButton}`}
                aria-label="Жирный"
            >
                B
            </Button>
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                aria-pressed={editorState.isItalic}
                className={`${controls.button} ${controls.iconButton}`}
                aria-label="Курсив"
            >
                I
            </Button>
            <Button
                type="button"
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                aria-pressed={editorState.isUnderline}
                className={`${controls.button} ${controls.iconButton}`}
                aria-label="Подчёркнутый"
            >
                U
            </Button>
            <HighlightDropdown editor={editor} />
            <div className={styles.group} role="group" aria-label="Списки">
                <Button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    aria-pressed={editorState.isBulletList}
                    className={controls.button}
                    aria-label="Маркированный список"
                >
                    M
                </Button>
                <Button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    aria-pressed={editorState.isOrderList}
                    className={controls.button}
                    aria-label="Нумерованный список"
                >
                    N
                </Button>
            </div>
            <div className={styles.group} role="group" aria-label="Выравнивание текста">
                <Button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    aria-pressed={editorState.isAlignLeft}
                    className={`${controls.button} ${controls.iconButton}`}
                    aria-label="По левому краю"
                >
                    ⇤
                </Button>
                <Button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    aria-pressed={editorState.isAlignCenter}
                    className={`${controls.button} ${controls.iconButton}`}
                    aria-label="По центру"
                >
                    ↔
                </Button>
                <Button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    aria-pressed={editorState.isAlignRight}
                    className={`${controls.button} ${controls.iconButton}`}
                    aria-label="По правому краю"
                >
                    ⇥
                </Button>
                <Button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    aria-pressed={editorState.isAlignJustify}
                    className={`${controls.button} ${controls.iconButton}`}
                    aria-label="По всей ширине"
                >
                    ≡
                </Button>
            </div>
            <Button
                type="button"
                onClick={() => editor.chain().focus().insertContent({type: 'imageUpload'}).run()}
                className={`${controls.button} ${controls.iconButton}`}
                aria-label="Вставить изображение"
            >
                Add
            </Button>
        </div>
        </>
    )
}
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolbar } from "./EditorToolbar";
import TextAlign from "@tiptap/extension-text-align";

export function RichTextEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3]
                },
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                defaultAlignment: 'left'
            }),
        ],
        content: '<p>Текст урока</p>',
    })

    return (
        <>
            {editor && <EditorToolbar editor={editor} />}
            <EditorContent editor={editor} />
        </>
    )
}
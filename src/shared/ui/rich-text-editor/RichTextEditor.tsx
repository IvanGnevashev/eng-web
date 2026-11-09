import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorToolbar } from "./EditorToolbar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { ImageUploadNode } from "./ImageUploadNode";

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
            Highlight.configure({
                multicolor: true
            }),
            Image,
            ImageUploadNode,
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
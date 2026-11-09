import { NodeViewWrapper, type NodeViewProps } from "@tiptap/react";
import { useState, type DragEvent } from "react";

export function ImageUploadView({editor, getPos, node}: NodeViewProps) {
    const [fileName, setFileName] = useState('')

    function handleImageFile(file: File | undefined) {
        if (!file || !file.type.startsWith('image/')) return

        const reader = new FileReader()

        reader.onload = () => {
            const from = getPos()
            const src = reader.result
            if (typeof from !== 'number' || typeof src !== 'string') return

            editor.commands.insertContentAt(
            { from, to: from + node.nodeSize },
            { type: 'image', attrs: { src } },
            )
        }

        reader.readAsDataURL(file)
        setFileName(file.name)
    }

    return (
        <NodeViewWrapper
            onDragOver={(event: DragEvent<HTMLDivElement>) => {
                if (event.dataTransfer.types.includes('Files')) event.preventDefault()
            }}
            onDrop={(event: DragEvent<HTMLDivElement>) => {
                if (!event.dataTransfer.types.includes('Files')) return
                event.preventDefault()
                handleImageFile(event.dataTransfer.files[0])
            }}
        >
            <label>
                Выбрать изображение
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageFile(event.currentTarget.files?.[0])}
                ></input>
            </label>
            {fileName && <p>{fileName}</p>}
        </NodeViewWrapper>
    )
}
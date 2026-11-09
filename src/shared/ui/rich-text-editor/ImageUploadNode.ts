import { Node, ReactNodeViewRenderer } from '@tiptap/react'
import { ImageUploadView } from './ImageUploadView'

export const ImageUploadNode = Node.create({
  name: 'imageUpload',
  group: 'block',
  atom: true,
  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadView)
  }
})
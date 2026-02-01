import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

function QuillEditor({ value, onChange }) {
    const editorRef = useRef(null)
    const quillRef = useRef(null)

    useEffect(() => {
        if (!quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['link', 'image', 'code-block'],
                        ['clean'],
                    ],
                },
            })

            quillRef.current.on('text-change', () => {
                onChange(quillRef.current.root.innerHTML)
            })
        }

        // Set initial value (edit post support)
        if (value && quillRef.current.root.innerHTML !== value) {
            quillRef.current.root.innerHTML = value
        }
    }, [value, onChange])

    return (
        <div className="rounded-lg border border-gray-300">
            <div ref={editorRef} />
        </div>
    )
}

export default QuillEditor

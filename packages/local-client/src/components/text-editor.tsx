import './text-editor.css'
import { useState, useEffect, useRef } from 'react'
import MDEditor from '@uiw/react-md-editor'

let TextEditor: React.FC = () => {
  var ref = useRef<HTMLDivElement | null>(null)
  var [text, setText] = useState<string | undefined>("# Hello, world");
  var [editing, setEditing] = useState(false)

  useEffect(() => {
    var listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }
      setEditing(false)
    }
    document.addEventListener('click', listener, { capture: true })
    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          value={text}
          onChange={setText}
        />
      </div>
    )
  }
  return (
    <div className="text-editor" onClick={() => setEditing(true)}>
      <div>
        <MDEditor.Markdown
          source={text}
        />
      </div>
    </div>
  )
}

export default TextEditor

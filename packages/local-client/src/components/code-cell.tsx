import { useState, useEffect } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import bundle from '../bundler'
import Resizable from './resizable'

let CodeCell = () => {
  var [input, setInput] = useState('')
  var [code, setCode] = useState('')
  var [error, setError] = useState('')

  useEffect(() => {
    var timer = setTimeout(async () => {
      var output = await bundle(input)
      setCode(output.code);
      setError(output.error);
    }, 750)

    return () => {
      clearTimeout(timer)
    }
  }, [input])

  return (
    <Resizable direction="vertical">
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} error={error} />
      </div>
    </Resizable>
  )
}

export default CodeCell

import { useState } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import bundle from '../bundler'

let CodeCell = () => {
  var [input, setInput] = useState('')
  var [code, setCode] = useState('')

  var onClick = async () => {
    var output = await bundle(input)
    setCode(output);
  }

  return (
    <div>
      <CodeEditor
        initialValue="console.log('Hello, world!')"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  )
}

export default CodeCell

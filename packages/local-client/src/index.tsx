import 'bulmaswatch/superhero/bulmaswatch.min.css'
import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { fecthPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import CodeEditor from './components/code-editor'
import Preview from './components/preview'

let App = () => {
  var ref = useRef<any>()
  var [input, setInput] = useState('')
  var [code, setCode] = useState('')

  var startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm'
    })
  }
  useEffect(() => {
    startService()
  }, [])
  var onClick = async () => {
    if (!ref.current) {
      return;
    }


    let result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fecthPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      }
    })

    setCode(result.outputFiles[0].text);
  }

  return (
    <div>
      <CodeEditor
        initialValue="console.log('Hello, world!')"
        onChange={(value) => setInput(value)}
      />
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)   

import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { fecthPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'

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
      <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)   

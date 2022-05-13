import './components/code-editor.css'
import * as esbuild from 'esbuild-wasm'
import { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { fecthPlugin } from './plugins/fetch-plugin'
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin'
import CodeEditor from './components/code-editor'

let App = () => {
  var ref = useRef<any>()
  var iframe = useRef<any>()
  var [input, setInput] = useState('')

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

    iframe.current.srcdoc = html

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

    // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*')
  }

  let html = `
    <html>
      <head></head>
      <body>
        <div id="root"></div>
        <script>
          window.addEventListener('message', (event) => {
            try {
              eval(event.data)
            } catch(error) {
              const root = document.getElementById('root')
              root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>'
              console.error(error);
            }
          },false)
        </script>
      </body>
    </html>
  `
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
      <iframe title="preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)   

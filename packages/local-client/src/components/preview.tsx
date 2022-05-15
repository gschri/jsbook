import './preview.css'
import { useRef, useEffect } from 'react'
interface PreviewProps {
  code: string;
};

let html = `
  <html>
    <head>
      <style>html {background-color: white;}</style>
    </head>
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


let Preview: React.FC<PreviewProps> = ({ code }) => {
  var iframe = useRef<any>()

  useEffect(() => {
    iframe.current.srcdoc = html
    var timeout = setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*')
    }, 50);

    return () => {
      clearTimeout(timeout)
    }
  }, [code])

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  )

};

export default Preview;

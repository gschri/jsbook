import { useRef, useEffect, FC } from 'react'
interface PreviewProps {
  code: string;
};

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


let Preview: FC<PreviewProps> = ({ code }) => {
  var iframe = useRef<any>()
  useEffect(() => {
    iframe.current.srcdoc = html
    iframe.current.contentWindow.postMessage(code, '*')
  }, [code])
  return (
    <iframe
      title="preview"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
    />
  )

};

export default Preview;

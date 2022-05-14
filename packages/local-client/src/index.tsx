import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDOM from 'react-dom'
import CodeCell from './components/code-cell'

let App = () => {
  return (
    <div>
      <CodeCell />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)   

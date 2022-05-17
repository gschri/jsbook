import './code-cell.css'
import { useEffect } from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import Resizable from './resizable'
import { Cell } from '../state'
import { useActions } from '../hooks/use-actions'
import { useTypedSelector } from '../hooks/use-typed-selector'

interface CodeCellProps {
  cell: Cell
}

let CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  var { updateCell, createBundle } = useActions()
  var bundle = useTypedSelector(state => state.bundles ? state.bundles[cell.id] : undefined)
  var cumulativeCode = useTypedSelector(state => {
    var { data, order } = state.cells
    var orderedCells = order.map(id => data[id])

    var cumulativeCode = []
    for (let c of orderedCells) {
      if (c.type === 'code') {
        cumulativeCode.push(c.content)
      }
      if (c.id === cell.id) break;

    }
    return cumulativeCode
  })

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'))
      return;
    }

    var timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'))
    }, 750)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.id, cumulativeCode.join('\n'), createBundle])

  return (
    <Resizable direction="vertical">
      <div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className="progress-wrapper">
          {
            !bundle || bundle.loading ? (
              <div className="progress-cover">
                <progress className="progress is-small is-primary" max="100">
                  Loading
              </progress>
              </div>
            ) : (
                <Preview code={bundle.code} error={bundle.error} />
              )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell

import './cell-list.css'
import { Fragment, useEffect } from 'react'
import { useTypedSelector } from '../hooks/use-typed-selector'
import CellListItem from './cell-list-item'
import AddCell from './add-cell'
import { useActions } from '../hooks/use-actions'

let CellList: React.FC = () => {
  var cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  )

  var { fetchCells, saveCells } = useActions()

  useEffect(() => {
    fetchCells();
  }, [])

  var renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ))
  return (
    <div className="cell-list">
      <AddCell
        forceVisible={cells.length === 0}
        previousCellId={null}
      />
      {renderedCells}
    </div>
  )
}

export default CellList

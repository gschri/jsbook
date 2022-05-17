import { Fragment } from 'react'
import { useTypedSelector } from '../hooks/use-typed-selector'
import CellListItem from './cell-list-item'
import AddCell from './add-cell'

let CellList: React.FC = () => {
  var cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map(id => data[id])
  )

  var renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ))
  return (
    <div>
      <AddCell
        forceVisible={cells.length === 0}
        previousCellId={null}
      />
      {renderedCells}
    </div>
  )
}

export default CellList

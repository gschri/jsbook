import produce from 'immer'
import { ActionType } from '../action-types'
import { Action } from '../actions'
import { Cell } from '../cell'

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell
  }
}

let initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
}

let reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      let { id, content } = action.payload
      state.data[id].content = content
      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload]
      state.order = state.order.filter(id => id !== action.payload)
      return state;
    case ActionType.MOVE_CELL:
      let { direction } = action.payload
      let index = state.order.findIndex((id) => id === action.payload.id)
      let targetIndex = direction === 'up' ? index - 1 : index + 1

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex]
      state.order[targetIndex] = action.payload.id

      return state;
    case ActionType.INSERT_CELL_BEFORE:
      let cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId()
      }

      state.data[cell.id] = cell;

      let foundIndex = state.order.findIndex(id => id === action.payload.id);
      if (foundIndex < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(foundIndex, 0, cell.id)
      }

      return state;
    default:
      return state;
  }
})

let randomId = () => {
  return Math.random().toString(36).substr(2, 5);
}

export default reducer;

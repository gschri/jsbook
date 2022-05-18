import { Cell } from '../cell'
import { createReducer } from '@reduxjs/toolkit'
import {
  updateCellAction,
  moveCellAction,
  insertCellAfterAction,
  deleteCellAction,
  fetchCellsCompleteAction,
  fetchCellsErrorAction,
  fetchCellsStartAction,
  saveCellsErrorAction
} from '../action-creators'

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

let reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCellAction, (state, action) => {
      var { id, content } = action.payload
      state.data[id].content = content
    })
    .addCase(deleteCellAction, (state, action) => {
      delete state.data[action.payload]
      state.order = state.order.filter(id => id !== action.payload)
    })
    .addCase(moveCellAction, (state, action) => {
      var { direction } = action.payload
      var index = state.order.findIndex((id) => id === action.payload.id)
      var targetIndex = direction === 'up' ? index - 1 : index + 1

      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }

      state.order[index] = state.order[targetIndex]
      state.order[targetIndex] = action.payload.id
    })
    .addCase(insertCellAfterAction, (state, action) => {
      var cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId()
      }

      state.data[cell.id] = cell;

      var foundIndex = state.order.findIndex(id => id === action.payload.id);
      if (foundIndex < 0) {
        state.order.unshift(cell.id);
      } else {
        state.order.splice(foundIndex + 1, 0, cell.id)
      }
    })
    .addCase(fetchCellsStartAction, (state, action) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCellsCompleteAction, (state, action) => {
      state.order = action.payload.map(cell => cell.id)
      state.data = action.payload.reduce((acc, cell) => {
        acc[cell.id] = cell;
        return acc
      }, {} as CellsState['data'])
    })
    .addCase(fetchCellsErrorAction, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(saveCellsErrorAction, (state, action) => {
      state.error = action.payload
    })
})

let randomId = () => {
  return Math.random().toString(36).substr(2, 5);
}

export default reducer;

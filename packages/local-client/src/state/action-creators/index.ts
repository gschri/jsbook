import { Dispatch } from 'redux';
import axios from 'axios'
import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../action-types'
import { AppDispatch, RootState } from '../store'
import {
  Direction,
} from '../actions'
import { Cell, CellTypes } from '../cell';
import bundle from '../../bundler'

export let updateCellAction = createAction<{ id: string, content: string }>(ActionType.UPDATE_CELL)
export let updateCell = (id: string, content: string) => updateCellAction({ id, content })

export let deleteCellAction = createAction<string>(ActionType.DELETE_CELL)
export let deleteCell = (id: string) => deleteCellAction(id)

export let moveCellAction = createAction<{ id: string, direction: Direction }>(ActionType.MOVE_CELL)
export let moveCell = (id: string, direction: Direction) => moveCellAction({ id, direction })

export let insertCellAfterAction = createAction<{ id: string | null, type: CellTypes }>(ActionType.INSERT_CELL_AFTER)
export let insertCellAfter = (id: string | null, type: CellTypes) => insertCellAfterAction({ id, type })

export let bundleStartAction = createAction<{ cellId: string }>(ActionType.BUNDLE_START)
export let bundleStart = (cellId: string) => bundleStartAction({ cellId })
export let bundleCompleteAction = createAction<{ cellId: string, bundle: { code: string, error: string } }>(ActionType.BUNDLE_COMPLETE)
export let bundleComplete = (cellId: string, bundle: { code: string, error: string }) => bundleCompleteAction({ cellId, bundle })

export let createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<ReturnType<typeof bundleStart | typeof bundleComplete>>) => {
    dispatch(bundleStart(cellId))

    let result = await bundle(input)

    dispatch(bundleComplete(cellId, result))
  }
}

export let fetchCellsStartAction = createAction(ActionType.FETCH_CELLS_START);
export let fetchCellsCompleteAction = createAction<Cell[]>(ActionType.FETCH_CELLS_COMPLETE)
export let fetchCellsErrorAction = createAction<string>(ActionType.FETCH_CELLS_ERROR)

export let fetchCells = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchCellsStartAction())

    try {
      let { data }: { data: Cell[] } = await axios.get('/cells')
      console.log(data)

      dispatch(fetchCellsCompleteAction(data))
    } catch (error: any) {
      dispatch(fetchCellsErrorAction(error.message))
    }
  }
}
export let saveCellsErrorAction = createAction<string>(ActionType.SAVE_CELLS_ERROR)

export let saveCells = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    var { cells: { data, order } } = getState()

    var cells = order.map(id => data[id])
    console.log('post: ', cells)

    try {
      await axios.post('/cells', { cells })
    } catch (error: any) {
      dispatch(saveCellsErrorAction(error.message))
    }
  }
}

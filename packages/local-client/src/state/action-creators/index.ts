import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../action-types'
import {
  Direction,
  Action
} from '../actions'
import { CellTypes } from '../cell';
import bundle from '../../bundler'
import { Dispatch } from 'react';

export let updateCellAction = createAction<{ id: string, content: string }>(ActionType.UPDATE_CELL)
export let updateCell = (id: string, content: string) => updateCellAction({ id, content })

export let deleteCellAction = createAction<string>(ActionType.DELETE_CELL)
export let deleteCell = (id: string) => deleteCellAction(id)

export let moveCellAction = createAction<{ id: string, direction: Direction }>(ActionType.MOVE_CELL)
export let moveCell = (id: string, direction: Direction) => moveCellAction({ id, direction })

export let insertCellAfterAction = createAction<{ id: string | null, type: CellTypes }>(ActionType.INSERT_CELL_AFTER)
export let insertCellAfter = (id: string | null, type: CellTypes) => insertCellAfterAction({ id, type })

export let createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.BUNDLE_START,
      payload: {
        cellId
      }
    })

    let result = await bundle(input)

    dispatch({
      type: ActionType.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result
      }
    })

  }
}

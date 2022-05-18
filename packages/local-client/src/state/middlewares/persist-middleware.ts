import { Middleware } from 'redux'
import { ActionType } from '../action-types'
import { saveCells } from '../action-creators'
import { RootState } from '../store'

export let persistMiddleware: Middleware<
  {},
  RootState
> = storeApi => {
  let timer: any;
  let { dispatch, getState } = storeApi
  return next => action => {
    var actionTypesList = [ActionType.MOVE_CELL, ActionType.UPDATE_CELL, ActionType.DELETE_CELL, ActionType.INSERT_CELL_AFTER]

    next(action)

    if (actionTypesList.includes(action.type)) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        saveCells()(dispatch, getState)
      }, 250)
    }
  }
}

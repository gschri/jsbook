import { ActionType } from '../action-types'
import {
  Action,
  Direction,
  UpdateCellAction,
  DeleteCellAction,
  InsertCellBeforeAction,
  MoveCellAction
} from '../actions'
import { CellTypes } from '../cell';

export let updateCell = (id: string, content: string): UpdateCellAction => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content
    }
  }
};

export let deleteCell = (id: string): DeleteCellAction => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id
  }
};

export let moveCell = (id: string, direction: Direction): MoveCellAction => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction
    }
  }
};

export let insertCellBefore = (id: string, cellType: CellTypes): InsertCellBeforeAction => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType
    }
  }

};

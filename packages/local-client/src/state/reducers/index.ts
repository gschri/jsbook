import { combineReducers } from 'redux'
import cellsReducer from './cellsReducer'

let reducers = combineReducers({
  cells: cellsReducer
})

export default reducers;

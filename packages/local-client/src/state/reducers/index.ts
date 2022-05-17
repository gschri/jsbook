import { combineReducers } from 'redux'
import cellsReducer from './cellsReducer'
import bundlesReducer from './bundlesReducer'

let reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundlesReducer
})

export default reducers;

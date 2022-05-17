import { configureStore } from '@reduxjs/toolkit'
import { insertCellAfter } from './action-creators';
import reducers from './reducers'

export let store = configureStore({
  reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>;

store.dispatch(insertCellAfter(null, 'code'))

store.dispatch(insertCellAfter(null, 'text'))

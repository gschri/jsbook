import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import reducers from './reducers'

export let store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

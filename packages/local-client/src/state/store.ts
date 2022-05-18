import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'
import { persistMiddleware } from './middlewares/persist-middleware'

export type RootState = ReturnType<typeof reducers>;

export let store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(persistMiddleware)
})

export type AppDispatch = typeof store.dispatch


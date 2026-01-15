import { configureStore } from '@reduxjs/toolkit'
import superheroReducer from './superheroSlice'
import { superHeroApi } from './superHeroApi'

export const store = configureStore({
  reducer: {
    superheros: superheroReducer,
    [superHeroApi.reducerPath]: superHeroApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(superHeroApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
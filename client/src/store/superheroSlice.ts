import { createSlice } from '@reduxjs/toolkit'


export interface SuperheroSlice {
  page: number

}
const initialState: SuperheroSlice = {
  page: 1,
}

export const superheroSlice = createSlice({
  name: 'superhero',
  initialState,
  reducers: {
      setPage(state, action) {
        state.page = action.payload
      }
  }
})


export const { setPage } = superheroSlice.actions

export default superheroSlice.reducer
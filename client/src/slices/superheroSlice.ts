import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import instance from '../axios';
import type { PaginatedSuperHeroResponse, SuperHero } from '@/types';



export const fetchSuperHeros = createAsyncThunk<PaginatedSuperHeroResponse, number>('superhero/fetchSuperheros', async (page, thunkApi) => {
   try {
     const { data } = await instance.get(`/superhero/?page=${page}&limit=5`);

     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})

export const fetchSuperHero = createAsyncThunk<SuperHero, string>('superhero/fetchSuperhero', async (id, thunkApi) => {  
   try {
     const { data } = await instance.get(`/superhero/${id}`);
     
     return data

   } catch (error: any) {
      return thunkApi.rejectWithValue(error.message)
   }
})
export const createSuperHero = createAsyncThunk<SuperHero, FormData>('superhero/createSuperhero', async (fd, thunkApi) => {
   try {
     const { data } = await instance.post('/superhero', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
      });

     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})
export const updateSuperHero = createAsyncThunk<SuperHero, { id: string, body: FormData }>('superhero/updateSuperhero', async ({id, body}, thunkApi) => {
   try {
     const { data } = await instance.patch(`/superhero/${id}`, body);
     
     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})
export const deleteSuperHeroImg = createAsyncThunk<{ id: number }, number>('superhero/deleteSuperheroImg', async (imgId, thunkApi) => {
   try {
     const { data } = await instance.delete(`/superhero/remove-images/${imgId}`);
     
     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})

export const deleteSuperHero = createAsyncThunk<{id: string}, string>('superhero/deleteSuperhero', async (id, thunkApi) => {
   try {
     const { data } = await instance.delete(`/superhero/${id}`);
     
     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})


export interface SuperheroSlice {
  superheros: SuperHero[]
  selectedSuperhero: SuperHero | null
  loading: boolean
  page: number
  totalPages: number
  totalCount: number
  error: string | null
}
const initialState: SuperheroSlice = {
  superheros: [],
  selectedSuperhero: null,
  loading: false,
  page: 1,
  totalCount: 0,
  totalPages: 0,
  error: null
}

export const superheroSlice = createSlice({
  name: 'superhero',
  initialState,
  reducers: {
      setPage(state, action) {
        state.page = action.payload
      }
  },
  extraReducers(builder) {
      builder
      .addCase(fetchSuperHeros.fulfilled, (state, action) => {
        state.superheros = action.payload.data
        state.page =  action.payload.meta.page
        state.totalCount = action.payload.meta.totalCount
        state.totalPages = action.payload.meta.lastPage
      })
      
      .addCase(fetchSuperHero.fulfilled, (state, action) => {
        state.selectedSuperhero = action.payload
      })
    
      .addCase(deleteSuperHero.fulfilled, (state, action) => {
        state.superheros = state.superheros.filter(item => item.id != action.payload.id)
      })
      .addCase(updateSuperHero.fulfilled, (state, action) => {
        state.selectedSuperhero = action.payload
      })
      
      .addCase(deleteSuperHeroImg.fulfilled, (state, action) => {
        if(state.selectedSuperhero?.Images) {
          state.selectedSuperhero.Images = state.selectedSuperhero?.Images.filter(img => img.id !== action.payload.id)
        }
        
      })
     
      .addCase(createSuperHero.fulfilled, (state, action) => {
        state.superheros = [...state.superheros, action.payload] 
      })


      .addMatcher(action => action.type.endsWith('/pending'), state => {
        state.loading = true
        state.error = null
      })
      .addMatcher(action => action.type.endsWith('/fulfilled'), state => {
        state.loading = false
      })
      .addMatcher(action => action.type.endsWith('/rejected'), (state, action: PayloadAction<string | undefined>) => {
        state.loading = false
        state.error = action.payload ?? 'Unknown error'
      })

      
  },
})


export const { setPage } = superheroSlice.actions

export default superheroSlice.reducer
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import instance from '../axios';


type updateSuperHeroType = {
    real_name: string
    nickname: string
    superpowers: string
    catch_phrase: string
    Images: string[]
}


export const fetchSuperHeros = createAsyncThunk('superhero/fetchSuperheros', async (page: number, thunkApi) => {
   try {
     const { data } = await instance.get(`/superhero/?page=${page}&limit=5`);
     console.log(data)
     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})

export const fetchSuperHero = createAsyncThunk('superhero/fetchSuperhero', async (id: string | undefined, thunkApi) => {  
   try {
     const { data } = await instance.get(`/superhero/${id}`);
     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})
export const createSuperHero = createAsyncThunk('superhero/createSuperhero', async (fd: FormData, thunkApi) => {
   try {
     const { data } = await instance.post('/superhero', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})
export const updateSuperHero = createAsyncThunk('superhero/updateSuperhero', async ({id, body}: {id: string | undefined, body: FormData}, thunkApi) => {
   try {
     const { data } = await instance.patch(`/superhero/${id}`, body);
     console.log(data)
     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})
export const deleteSuperHeroImg = createAsyncThunk('superhero/deleteSuperheroImg', async (imgId: number, thunkApi) => {
   try {
     const { data } = await instance.delete(`/superhero/remove-images/${imgId}`);
     return data

     console.log(data)

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})

export const deleteSuperHero = createAsyncThunk('superhero/deleteSuperhero', async (id: string | undefined, thunkApi) => {
   try {
     const { data } = await instance.delete(`/superhero/${id}`);

     console.log(data)
     
     return data

   } catch (error: any) {
        return thunkApi.rejectWithValue(error.message)
   }
})

type image = {
      id: number
      url: string
      superheroId: number
}

export type SuperHero  = {
    id: number
    real_name: string
    nickname: string
    superpowers: string
    origin_description: string
    catch_phrase: string
    Images: image[]
}

export interface SuperheroSlice {
  superheros: SuperHero[]
  selectedSuperhero: SuperHero | null
  loading: boolean
  page: number
  totalPages: number
  totalCount: number
}
const initialState: SuperheroSlice = {
  superheros: [],
  selectedSuperhero: null,
  loading: false,
  page: 1,
  totalCount: 0,
  totalPages: 0
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
       .addCase(fetchSuperHeros.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSuperHeros.fulfilled, (state, action) => {
        state.loading = false
        state.superheros = action.payload.data
        state.page =  action.payload.meta.page
        state.totalCount = action.payload.meta.totalCount
        state.totalPages = action.payload.meta.lastPage
      })
      .addCase(fetchSuperHeros.rejected, (state) => {
        state.loading = false
      })
      .addCase(fetchSuperHero.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchSuperHero.fulfilled, (state, action) => {
        state.loading = false
        state.selectedSuperhero = action.payload
      })
      .addCase(fetchSuperHero.rejected, (state) => {
        state.loading = false
      })
      .addCase(deleteSuperHero.fulfilled, (state, action) => {
        state.superheros = state.superheros.filter(item => item.id != action.payload.id)
      })
      .addCase(updateSuperHero.fulfilled, (state, action) => {
        state.selectedSuperhero = action.payload
        state.loading = false
      })
      .addCase(updateSuperHero.pending, (state) => {
        state.loading = true
      })
      .addCase(updateSuperHero.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(deleteSuperHeroImg.fulfilled, (state, action) => {
        if(state.selectedSuperhero?.Images) {
          state.selectedSuperhero.Images = state.selectedSuperhero?.Images.filter(img => img.id != action.payload.id)
        }
        state.loading = false
        
      })
      .addCase(deleteSuperHeroImg.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteSuperHeroImg.rejected, (state, action) => {
        state.loading = false
      })
      .addCase(createSuperHero.fulfilled, (state, action) => {
        state.superheros = [...state.superheros, action.payload]
        state.loading = false
        
      })
      .addCase(createSuperHero.pending, (state) => {
        state.loading = true
      })
      .addCase(createSuperHero.rejected, (state, action) => {
        state.loading = false
      })

      
  },
})


export const { setPage } = superheroSlice.actions

export default superheroSlice.reducer
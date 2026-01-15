import type { PaginatedSuperHeroResponse, SuperHero } from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const superHeroApi = createApi({
  reducerPath: 'superHeroApi',
  tagTypes: ['SuperHeros'],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (build) => ({
    getSuperHeroById: build.query<SuperHero, string>({
      query: (id) => `/superhero/${id}`,
      providesTags: (result, error, id) => [{ type: 'SuperHeros', id }],
    }),
    getSuperHeros: build.query<PaginatedSuperHeroResponse, number>({
      query: (page) => `/superhero/?page=${page}&limit=5`,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'SuperHeros' as const, id })),
              { type: 'SuperHeros', id: 'LIST' },
            ]
          : [{ type: 'SuperHeros', id: 'LIST' }],
    }),
    addSuperHero: build.mutation({
        query: (body) => ({
            url: '/superhero',
            method: "POST",
            body
        }),
        invalidatesTags: [{type: 'SuperHeros', id: "LIST"}]
    }),
    updateSuperHero: build.mutation<void, {id: string; body: FormData}>({
        query: ({ id, body }) => ({
            url: `/superhero/${id}`,
            method: "PATCH",
            body
        }),
        invalidatesTags: (r, e, { id }) => [
          { type: 'SuperHeros', id },
          { type: 'SuperHeros', id: 'LIST' },
        ]
    }),
    deleteSuperHero: build.mutation<void, string>({
        query: (id) => ({
            url: `/superhero/${id}`,
            method: "DELETE"
        }),
        invalidatesTags: [{type: 'SuperHeros', id: "LIST"}]
    }),
    deleteSuperHeroImage: build.mutation<void, number>({
        query: (id) => ({
            url: `/superhero/remove-images/${id}`,
            method: "DELETE"
        }),
        invalidatesTags: [{type: 'SuperHeros', id: "LIST"}]
    })
  }),
})


export const { useGetSuperHeroByIdQuery, useGetSuperHerosQuery, useAddSuperHeroMutation, useUpdateSuperHeroMutation, useDeleteSuperHeroMutation, useDeleteSuperHeroImageMutation } = superHeroApi
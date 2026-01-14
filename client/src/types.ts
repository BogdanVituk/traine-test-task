
export type image = {
      id: number
      url: string
      superheroId: number
}

export type SuperHero  = {
    id: string
    real_name: string
    nickname: string
    superpowers: string
    origin_description: string
    catch_phrase: string
    Images: image[]
}

export interface PaginatedSuperHeroResponse {
  data: SuperHero[]
  meta: {
    lastPage: number,
    page: number,
    totalCount: number
  }
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Game, GamesResponse} from './game.types'

const BASE_URL = '/api/pragmatic/game'
const PARTNER_NAME = 'belparyaj'

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getGames: builder.query<Game[], void>({
            query: () => ({
                url: '/list',
                params: {
                    partner_name: PARTNER_NAME,
                },
            }),
            transformResponse: (response: GamesResponse) => response.result,
        }),
    }),
})

export const { useGetGamesQuery } = gameApi
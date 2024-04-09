import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { GetKpisResponse } from "./types"

const baseUrl1 = import.meta.env.VITE_BASE_URL
console.log(import.meta.env)
console.log(baseUrl1)

export const api = createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseUrl1}),
    reducerPath:"main",
    tagTypes: ["Kpis"], 
    endpoints: (build) => ({ 
        getKpis: build.query<Array<GetKpisResponse>, void>({ 
            query: () => "kpi/kpis",
            providesTags: ["Kpis"]
        }),
    })
})

export const {useGetKpisQuery} = api
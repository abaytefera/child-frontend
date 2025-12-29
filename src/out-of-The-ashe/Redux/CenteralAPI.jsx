import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const APi=createApi({
reducerPath:'api',
baseQuery:fetchBaseQuery({
    baseUrl:"http://localhost:8080",
    prepareHeaders:(headers,{getState})=>{
    let token=localStorage.getItem('authToken');
      if(token){

       headers.set('authorization',`Bearer ${token}`);

      }
   return headers

    }
}),
tagTypes:['Employes'],
endpoints:()=>({})






})
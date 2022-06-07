
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints

export const userAuthApi = createApi({
  reducerPath: 'userAuthApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api' }),


  endpoints: (builder) => ({
    registerUser: builder.mutation({
        query:(user)=>{
            return{
                url:'register',
                method:'POST',
                body:user,
                headers:{
                    'Content-type':'application/json',
                    'Accept': 'application/json',
                }



            }
        }
     
    }),


    loginUser: builder.mutation({
      query:(user)=>{
          return{
              url:'login',
              method:'POST',
              body:user,
              headers:{
                  'Content-type':'application/json',
                  'Accept': 'application/json',
              }



          }
      }
   
  }),

  getLoggedUser: builder.query({
    query: (token) => {
      return {
        url: 'loggeduser',
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
        }
      }
    }
  }),

  logoutUser: builder.mutation({
    query: ({ token }) => {
      return {
        url: 'logout',
        method: 'POST',
        body: {},
        headers: {
          'authorization': `Bearer ${token}`,
        }
      }
    }
  }),


  getAllEvents: builder.query({
    query: (token) => {
      return {
        url: 'fetch_event',
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
        }
      }
    }
  }),

  getSingleEvents: builder.query({
    query: (id) => {
      return {
        url: `event_scheduled/${id}`,
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      }
    }
  }),


  


    

  

  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRegisterUserMutation,useLoginUserMutation,useLogoutUserMutation ,useGetLoggedUserQuery,useGetAllEventsQuery,useGetSingleEventsQuery} = userAuthApi
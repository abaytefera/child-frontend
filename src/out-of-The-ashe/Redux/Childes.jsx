import { APi } from "./CenteralAPI";

export const Child=APi.injectEndpoints({
  endpoints:(builder)=>({

     getChilds:builder.query({
        query:()=>'/Child',
        providesTags:[{type:'Child',id:'List'}]
       
        


     }),
     getChildbyName:builder.query({
      query:(Searchvalue)=>`/Child/SearchByName?search=${Searchvalue}`,
      providesTags:[{type:'ChildSearch',id:'searchresult'}]


     }),
     getChildByID:builder.query({
      query:(searchId)=>`/Child/SearchById?searchId=${searchId}`,
      providesTags:[{type:'ChildSearchById',id:'searchResult'}]
     


     }),
     updateChild:builder.mutation({
     query:(update)=>({
      url:'/Child/Update',
      method:'PUT',
      body:update
     }),
     invalidatesTags:[{type:'ChildSearchById',id:'searchResult'}]


     }),



    createChild:builder.mutation({
        query:(childData)=>({
        url:'/Child/Create',
        method:'POST',
        body:childData


      }),
     invalidatesTags:[{type:'Child',id:'List'}]


    }),

    createChildOtherFile:builder.mutation({

      query:(OtherFile)=>({
         url:'/Child/OtherFileCreate',
         method:"POST",
         body:OtherFile
         



      }),
       invalidatesTags:[{type:'ChildSearchById',id:'searchResult'}]




    }),

deleteFile:builder.mutation({
query:({public_id,id,selectionType})=>({
url:'/Child/delete-file',
method:'DELETE',
body:{public_id,id,selectionType}

}),
invalidatesTags:[{type:'ChildSearchById',id:'searchResult'}]


}),

UploadProfile:builder.mutation({
query:(file)=>({
url:'/Child/UploadProfile',
method:'POST',
body:file

}),
invalidatesTags:[{type:'ChildSearchById',id:'searchResult'}]

})





})



 


})
export const {useCreateChildMutation,useCreateChildOtherFileMutation,useUpdateChildMutation,useGetChildsQuery,useGetChildbyNameQuery,useGetChildByIDQuery,useDeleteFileMutation,useUploadProfileMutation}=Child
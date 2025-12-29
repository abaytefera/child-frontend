
import { APi } from "./CenteralAPI";

const Employee=APi.injectEndpoints({
endpoints:(builder)=>({
getEmployees:builder.query({

    query:()=>'/Employees',
    providesTags:(result)=>
        result ?
         [{type:'Employees',_id:'List'},
           ...result.map(({ _id }) => ({ type: 'Employees', _id })),
         ]
         :[{type:'Employees',_id:'List'}]

}),

createEmployee:builder.mutation({
query:(Emp)=>({
url:"/Employees/Create",
method:'POST',
body:Emp


}),
invalidatesTags:[{type:'Employees',_id:'List'}]

}),

getEmployeeById:builder.query({
query:(id)=>`/Employees/getById?id=${id}`





})



}),


overrideExisting: false,

})
export const {useGetEmployeesQuery,useCreateEmployeeMutation,useGetEmployeeByIdQuery}=Employee;
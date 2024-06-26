import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { config } from "../config";
import { axiosApiAdmin } from "../Services/axios";





export const adminLogin = createAsyncThunk('admin/login',async (loginData,thunkAPI)=>{
    try {
        console.log('yessss');
        console.log(loginData);

        const response = await axiosApiAdmin.post(`/login`,loginData,{
           
            headers:{
                'Content-Type':'application/json',
            },
          
        })

        if(response.status===302){
            console.log('response',response);

            const data= await response.data
            console.log(response);
            throw new Error(data.message)
        }

       

        const data = await response.data

        Cookies.set('adminToken',data.adminToken)
        Cookies.set('refreshToken',data.refreshToken,{expires:7})
        console.log(data.adminToken);

        return data
        
    } catch (error) {
        throw error
    }
})


const initialState= {
    msg:'',
    user:null,
    loading :false,
    error:null
}



const adminSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        clearAdmin:(state)=>{
            state.user=null
        },
        adminLoginSuccess:(state,action)=>{
            state.error= null
        },
        adminLoginFailure:(state,action)=>{
            state.error=action.payload
        },
        setAdmin:(state,action)=>{
            state.user=action.payload
        }

    },
    extraReducers:(builder)=>{
        builder
      
           .addCase(adminLogin.pending,(state,action)=>{
                state.loading=true
                state.error=null
                console.log(state,'Statee');
            })
            .addCase(adminLogin.fulfilled,(state,action)=>{
                
                state.loading=false
                state.msg=action.payload.message;
                state.user=action.payload.user
                state.error= null
                console.log(state.user,'login admin aaanneeeee');

            }) 
            .addCase(adminLogin.rejected,(state,action)=>{
               console.log('action',action);
                state.loading=false
                state.error=action.error.message
                console.log(state.error);
            })
    }

})


export default adminSlice.reducer;

export const {clearAdmin,adminLoginFailure,adminLoginSuccess,setAdmin}= adminSlice.actions;


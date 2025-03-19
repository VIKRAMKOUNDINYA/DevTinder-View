import { createSlice } from "@reduxjs/toolkit";

const connectionSlice=createSlice({
    name:'connections',
    initialState:null,
    reducers:{
        addConnections:(payload,action)=>{
            return action.payload
        }
    }
});

export const {addConnections}=connectionSlice.actions;
export default connectionSlice.reducer
import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    dietisian: {},
    doctor : {}
}

export const recipeSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        getDietisian : (state, action) => {
            state.dietisian = action.payload
        },
        getDoctor : (state, action) => {
            state.doctor = action.payload
        },
    }
})

export const { getDietisian, getDoctor } = recipeSlice.actions

export default recipeSlice.reducer
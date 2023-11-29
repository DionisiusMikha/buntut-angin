import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    recipes : [],
    ingredients : [],
    steps : [],
}

export const recipeSlice = createSlice({
    name:"recipe",
    initialState,
    reducers:{
        addIngredients : (state, action) => {
            // state.recipes.push(action.payload)
            console.log(action.payload)
        },
        addRecipe : (state, action) => {
            console.log(action.payload)
            state.recipes.push({
                id : Math.random().toString(36).substr(2, 9),
                name: action.payload.name,
                ingredients: action.payload.ingredients,
                calories : action.payload.calories,
                carbo : action.payload.carbo,
                protein : action.payload.protein,
                fat : action.payload.fat,
            })
        },
    }
})

export const { addIngredients, addRecipe } = recipeSlice.actions

export default recipeSlice.reducer
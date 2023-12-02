import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    recipe : [],
    ingredients : [],
    steps : [],
}

export const recipeSlice = createSlice({
    name:"recipe",
    initialState,
    reducers:{
        addIngredients : (state, action) => {
            state.ingredients = [];
            for (let i = 0; i < action.payload.length; i++) {
                state.ingredients.push(action.payload[i])
            }
        },
        addSteps : (state, action) => {
            state.steps = [];
            for (let i = 0; i < action.payload.length; i++) {
                state.steps.push(action.payload[i])
            }
        },
        addRecipe : (state, action) => {
            state.recipe = [];
            state.recipe.push({
                name: action.payload.name,
                desc: action.payload.desc,
                images: action.payload.image,
                calories : action.payload.calories,
                carbo : action.payload.carbo,
                protein : action.payload.protein,
                fat : action.payload.fat,
            })
        },
    }
})

export const { addIngredients, addRecipe, addSteps } = recipeSlice.actions

export default recipeSlice.reducer
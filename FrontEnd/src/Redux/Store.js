import {configureStore} from "@reduxjs/toolkit"
import recipes from "./recipesSlice"

const store = configureStore({
    reducer:{
        recipes : recipes,
    },
})
export default store
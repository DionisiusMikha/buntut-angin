import {configureStore} from "@reduxjs/toolkit"
import recipes from "./recipesSlice"
import login from "./loginSlice"

const store = configureStore({
    reducer:{
        recipes : recipes,
        login : login,
    },
})
export default store
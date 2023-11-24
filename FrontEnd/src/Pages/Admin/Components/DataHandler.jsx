import recipes from "./dataRecipes.json";

const loadRecipes = () => {
    return recipes;
}

const getRecipe = (data) => {
    const { params } = data;
    console.log(params.id);
    return recipes.find((d) => d.id == params.id);
}

export default { loadRecipes, getRecipe };
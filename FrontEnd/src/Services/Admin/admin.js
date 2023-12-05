import client from "./client";

function getAllUsers(limit, filter, search){
    return client.get("/users", {
        params : {
            limit : limit, 
            filter : filter,
            search : search
        }
    });
}

function uploadImage(image, name){
    return client.post(`/image/${name}`, image);
}

function getAllRecipes(limit, search){
    return client.get("/resep", {
        params : {
            limit : limit, 
            search : search
        }
    })
}

function addNewRecipe(name, desc, image, ingredients, steps, nutrisi){
    return client.post("/resep", {
        name : name,
        description : desc,
        image_url : image,
        ingredients : ingredients,
        steps : steps,
        nutrition : nutrisi
    })
}

function getUserById(role, id){
    return client.get(`/users/${role}/${id}`)
}

function getRecipeById(id){
    return client.get(`/resep/${id}`)
}

export default {
    getAllUsers,
    uploadImage,
    getAllRecipes,
    addNewRecipe,
    getUserById,
    getRecipeById,
}
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

function getAllRecipe(){
    return client.get("/resep")
}

function addNewRecipe(name, desc, image, ingredients, steps){
    return client.post("/resep", {
        name : name,
        description : desc,
        image_url : image,
        ingredients : ingredients,
        steps : steps,
    })
}

function getUserById(role, id){
    return client.get(`/users/${role}/${id}`)
}

export default {
    getAllUsers,
    uploadImage,
    getAllRecipe,
    addNewRecipe,
    getUserById,
}
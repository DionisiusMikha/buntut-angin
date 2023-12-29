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

function addNewRecipe(name, desc, image, ingredientsName, ingredientsQty, ingredientsUom, steps, calories, carbo, protein, fat){
    return client.post("/add_recipe", {
        name : name,
        description : desc,
        image_url : image,
        ingredientsName : ingredientsName,
        ingredientsQty : ingredientsQty,
        ingredientsUom : ingredientsUom,
        steps : steps,
        calories : calories,
        carbo : carbo,
        protein : protein,
        fat : fat
    })
}

function updateRecipe(name, desc, image, ingredientsName, ingredientsQty, ingredientsUom, steps, calories, carbo, protein, fat, id){
    return client.put(`/resep/${id}`, {
        name : name,
        description : desc,
        image_url : image,
        ingredientsName : ingredientsName,
        ingredientsQty : ingredientsQty,
        ingredientsUom : ingredientsUom,
        steps : steps,
        calories : calories,
        carbo : carbo,
        protein : protein,
        fat : fat
    })
}

function getUserById(role, id){
    return client.get(`/users/${role}/${id}`)
}

function getRecipeById(id){
    return client.get(`/resep/${id}`)
}

function addNewDoctor(name, username, email, phoneNumber, address, birthdate, password){
    return client.post("/users/doctor", {
        display_name : name,
        username : username,
        email : email,
        phone_number : phoneNumber,
        address : address,
        birthdate : birthdate,
        password : password
    })
}

function addNewDietisian(display_name, email, username, password, birthdate, phone_number, address, weight, height, gender){
    return client.post("/users/dietisian", {
        display_name: display_name,
        email: email,
        username: username,
        password: password,
        birthdate: birthdate,
        phone_number: phone_number,
        address: address,
        weight: weight,
        height: height,
        gender: gender
    })
}

function getAllSubs(){
    return client.get("/subs")
}

function getDetailSubs(id){
    return client.get(`/subs/${id}`)
}

function getTop3(){
    return client.get("/getTop3Recipes")
}

export default {
    getAllUsers,
    uploadImage,
    getAllRecipes,
    addNewRecipe,
    getUserById,
    getRecipeById,
    updateRecipe,
    addNewDoctor,
    addNewDietisian,
    getAllSubs,
    getDetailSubs,
    getTop3,
}
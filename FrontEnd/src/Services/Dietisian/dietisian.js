import client from "./client";

function getAllUsers(){
    return client.get("/");
}
function registerUser(){
    return client.get("/register");
}
function loginUser(username, ps){
    return client.post("/login", {
        username: username,
        password: ps
    });
}
function editUser(){
    return client.get("/edit/:id_user");
}
function cekProfilKonsultan(){
    return client.get("/cekProfil");
}

export default {
    getAllUsers,
    registerUser,
    loginUser,
    editUser,
    cekProfilKonsultan
}
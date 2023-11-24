import client from "./client";

function getAllUsers(){
    return client.get("/");
}
function registerUser(data){
    return client.post("/register", {
        username: data.username,
        email: data.email,
        display_name: data.displayName,
        date_of_birth: data.birthdate,
        password: data.password,
        gender : data.gender,
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.log(error);
        if (error.response) {
            return error={
                data : error.response.data,
                status : error.response.status
            };
        } 
    });
}

function loginUser(username, ps){
    return client.post("/login", {
        username: username,
        password: ps
    })
    .then((response) => {
        return response;
    })
    .catch((error) => {
        if (error.response) {
            return error={
                data : error.response.data,
                status : error.response.status
            };
        } 
    });
}

function editUser(){
    return client.get("/edit/:id_user");
}

function cekProfilKonsultan(){
    return client.get("/cekProfil");
}

function getUserLogin(token){
    return client.get("/getLoginUser", {
        headers: {
            "x-auth-token": `${token}`,
        },
    }).then((response) => {
        return response;
    }).catch((error) => {
        if (error.response) {
            return error={
                data : error.response.data,
                status : error.response.status
            };
        } 
    })
}

export default {
    getAllUsers,
    registerUser,
    loginUser,
    editUser,
    cekProfilKonsultan,
    getUserLogin,
}
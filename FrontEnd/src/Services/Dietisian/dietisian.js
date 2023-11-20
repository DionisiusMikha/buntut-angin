import client from "./client";

function getAllUsers(){
    return client.get("/");
}
function registerUser(username, email, display_name, date_of_birth, password, confirm_password, role, phone_number, address){
    return client.get("/register", {
        username: username,
        email: email,
        display_name: display_name,
        date_of_birth: date_of_birth,
        password: password,
        confirm_password: confirm_password,
        role: role,
        phone_number: phone_number,
        address: address
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
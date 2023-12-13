import client from "./client";

function getAllDoctor(){
    return client.get("/");
}

function loginUser(username, password){
    return client.post("/login", {
        username: username,
        password: password
    })
    .then((response) => {
        console.log(response);
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

function editUser(user_id, data){
    return client.put(`/edit/${user_id}`, {
        username: data.username,
        address: data.address,
        email: data.email,
        phone_number: data.phone_number,
        birthdate: data.date_of_birth,
        gender: data.gender,
        display_name: data.display_name,
    })
    .then((response) => {
        console.log(response);
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

function viewJadwal(id){
    return client.get(`/get-jadwal/${id}`)
    .then((response) => {
        // console.log(response);
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

function getAllUsers(limit, filter, search){
    return client.get("/users", {
        params : {
            limit : limit, 
            filter : filter,
            search : search
        }
    });
}

export default {
    getAllDoctor,
    getUserLogin,
    getAllUsers,
    editUser,
    loginUser,
    viewJadwal
}
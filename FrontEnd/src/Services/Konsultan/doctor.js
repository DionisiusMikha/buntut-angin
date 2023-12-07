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
    loginUser,
    viewJadwal
}
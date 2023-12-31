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

function viewJadwal(id, date){
    return client.get(`/get-jadwal/${id}/${date}`)
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

function getUserLogin(token){
    return client.get("/getLoginDoctor", {
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

function changeStatus(id, status){
    return client.put(`/edit-status`, {
        id: id,
        status: status
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

function uploadImage(image, name){
    return client.post(`/image/${name}`, image);
}

export default {
    getAllDoctor,
    getUserLogin,
    getAllUsers,
    editUser,
    loginUser,
    viewJadwal,
    changeStatus,
    uploadImage
}
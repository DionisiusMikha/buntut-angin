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

export default {
    getAllDoctor,
    loginUser,
}
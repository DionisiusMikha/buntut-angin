import client from "./client";

function getAllDoctor(){
    return client.get("/");
}

export default {
    getAllDoctor,
}
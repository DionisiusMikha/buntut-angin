import client from "./client";

function getChat(room_id){
    return client.get(`/get-message/${room_id}`);
}

function getUsername(room_id){
    return client.get(`/get-username/${room_id}`);
}

function getRooms(username){
    return client.get(`/get-rooms`, {
        params: {
            username: username
        }
    });
}


export default {
    getChat,
    getUsername,
    getRooms
}
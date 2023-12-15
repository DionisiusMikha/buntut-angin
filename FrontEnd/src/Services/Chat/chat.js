import { Search } from "@mui/icons-material";
import client from "./client";

function getChat(room_id){
    return client.get(`/get-message/${room_id}`);
}

function getUsername(room_id){
    return client.get(`/get-username/${room_id}`);
}

function getRooms(username, search){
    return client.get(`/get-rooms`, {
        params: {
            username: username,
            search: search
        }
    });
}

function anotherUsername(username, roomId){
    return client.get(`/anotherUsername`, {
        params: {
            username: username,
            roomId: roomId
        }
    });
}


export default {
    getChat,
    getUsername,
    getRooms,
    anotherUsername,
}
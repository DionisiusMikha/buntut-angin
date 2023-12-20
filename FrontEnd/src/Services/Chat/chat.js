import { Search } from "@mui/icons-material";
import client from "./client";

function getChat(room_id){
    return client.get(`/get-message/${room_id}`);
}

function getRooms(username, search){
    return client.get(`/get-rooms`, {
        params: {
            username: username,
            search: search
        }
    });
}

function getRoomsUser(username, search){
    return client.get(`/get-rooms-user`, {
        params: {
            username: username,
            search: search
        }
    });
}

function getRoomByRoomId(roomId){
    return client.get(`/room/${roomId}`);
}

function addRoom(user, doctor){
    return client.post(`/rooms`, {
        user: user,
        doctor: doctor
    });
}

function searchUser(username, doctor){
    return client.get(`/user/${username}/${doctor}`);
}

export default {
    getChat,
    getRooms,
    getRoomsUser,
    addRoom,
    getRoomByRoomId,
    searchUser
}
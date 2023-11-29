import axios from "axios";
const key = "6d207e02198a847aa98d0a2a901485a5";

function upload(){
    return axios.post(`https://api.imgbb.com/1/upload?key=${key}`, data)
}

export default {
    upload,
}
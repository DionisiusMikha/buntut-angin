import axios from "axios";
const key = "6d207e02198a847aa98d0a2a901485a5";

function upload(gbr){
    return axios.post(`https://freeimage.host/api/1/upload?key=${key}`, {
        "source": gbr,
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error('Error:', error);
    });
}

export default {
    upload,
}
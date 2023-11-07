import client from "./client";

export default function getAllUsers(){
    return client.get("/");
}
export default function registerUser(){
    return client.get("/register");
}
export default function loginUser(){
    return client.get("/login");
}
export default function editUser(){
    return client.get("/edit/:id_user");
}
export default function cekProfilKonsultan(){
    return client.get("/cekProfil");
}
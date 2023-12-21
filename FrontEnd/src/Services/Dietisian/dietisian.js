import client from "./client";

function getAllUsers(){
    return client.get("/");
}
function registerUser(data){
    return client.post("/register", {
        username: data.username,
        email: data.email,
        display_name: data.displayName,
        birthdate: data.birthdate,
        password: data.password,
        gender : data.gender,
        phone_number : data.phone_number,
        address : data.address,
        weight : data.weight,
        height : data.height,
    })
    .then((response) => {
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

function editUser(user_id, data){
    return client.put(`/edit/${user_id}`, {
        username: data.username,
        email: data.email,
        phone_number: data.phone_number,
        birthdate: data.birthdate,
        display_name: data.display_name,
        address: data.address,
        weight: data.weight,
        height: data.height,
        jenis_kelamin: data.gender
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

function uploadProfilePicture(image, user_id){
    return client.put(`/edit-picture/${user_id}`, image);
}

function cekProfilKonsultan(){
    return client.get("/cekProfil");
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

function getAllRecipes(page, limit, search){
    return client.get("/resep", {
        params : {
            limit : limit, 
            search : search,
            page : page
        }
    })
}

function getSomeRecipes(page, limit, search){
    return client.get("/some-resep", {
        params : {
            limit : limit, 
            search : search,
            page : page
        }
    })
}

function changeStatusSubscription(id, status){
    return client.post(`/changeStatusSubscription/${id}`, {
        status : status
    })
}

function sendEmail(email){
    return client.post("/send_recovery_email", {
        email : email
    })
}

function addRatingComment(recipeId, userId, rating, comment){
    return client.post("/addRatingComment", {
        recipeId : recipeId,
        userId : userId,
        rating : rating,
        comment : comment
    })
}

function getUserByID(id){
    console.log(id)
    return client.get(`/getUserByID/${id}`)
}

function updateLike(id){
    return client.put(`/updateLike/${id}`)
}

function getAllKonsultan(){
    return client.get("/get-all-konsultan")
}

function ajukanKonsultasi(doctor_id, user_id, tanggal, jam){
    return client.post("/pengajuan-konsultasi", {
        doctor_id: doctor_id,
        user_id: user_id,
        tanggal: tanggal, 
        jam: jam,
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

function changePassword(email, newPassword){
    return client.put("/change-password", {
        email : email,
        newPassword : newPassword
    })
}

function verifyEmail(email , verificationCode){
    return client.put("/verify-email", {
        email : email,
        verificationCode : verificationCode
    })
}

function sendVerificationEmail(email){
    return client.put("/send-verification-email", {
        email : email
    })
}

function visitorCount(){
    return client.get("/visitor-count")
}


export default {
    getAllUsers,
    getAllKonsultan,
    registerUser,
    loginUser,
    editUser,
    cekProfilKonsultan,
    uploadProfilePicture,
    getUserLogin,
    getAllRecipes,
    changeStatusSubscription,
    getSomeRecipes,
    sendEmail,
    addRatingComment,
    getUserByID,
    updateLike,
    ajukanKonsultasi,
    changePassword,
    verifyEmail,
    sendVerificationEmail,
    visitorCount
}
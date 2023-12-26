Ada beberapa routingan yg tak ubah

- User : 
1. Edit profile picture -> /profile_picture/:id_user
2. Get All Konsultan -> /getAllDoctor
3. Get User By Id -> /:id_user

- Doctor:
1. Edit Doctor -> /edit/:id_doctor
2. Upload image -> /profile_picture/:id_doctor (dari post tak ganti ke put sama kek user)
3. Add Recipe -> /add_recipe/:id_doctor
4. Rekomendasi Menu -> /recommendation

*Buat catetan kalo misal mau nyambungin FrontEnd ke BackEnd biar url axiosnya ga salah
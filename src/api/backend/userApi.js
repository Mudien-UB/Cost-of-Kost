import axiosInstance from "../axiosInstance"

const updateUser = (username, fullname, email) =>{

   var request = {username : username,email: email, fullName: fullname}

   return axiosInstance.put('/user/update', request)
        .then(response => response?.data)
        .catch(err => {throw err})

}

export const userApi = {
        updateUser

}
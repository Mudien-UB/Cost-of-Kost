import axiosInstance from "../axiosInstance";

const login = (username, password) => {

    var request = {username : username, password: password}

    return axiosInstance.post('/auth/login', request)
        .then(response => response)
        .catch(error => {
            console.error('Login error:', error?.message);
            throw error || new Error("Something Wrong"); 
        });
};

const register = (fullName, username, email, password) => {

    var request = {username : username,email: email, password: password, fullName: fullName}

    return axiosInstance.post('/auth/register', request)
        .then(response => response)
        .catch(error => {
            console.error('Register error:', error?.message);
            throw error || new Error("Something Wrong");
        });
};

// const logout = () => {
//     return axiosInstance.post('/users/logout')
//         .then(response => response)
//         .catch(error => {
//             console.error('Logout error:', error?.message);
//             throw error || new Error("Something Wrong");
//         });
// };

    const logout = () => {
        return setTimeout(() => {},[1000])
    }


const whoAmI = () => {
    return axiosInstance.get('/user/me')
            .then(response => response)
            .catch(err => {
                console.log("Authorization Failed")
                localStorage.removeItem("token")
                throw err || new Error("Failed Auth")
            })
}

export const authApi = {
    login,
    register,
    logout,
    whoAmI
};

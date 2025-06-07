import axiosInstance from "../axiosInstance";

const login = (email, password) => {
    return axiosInstance.post('/auth/login', { email, password })
        .then(response => response)
        .catch(error => {
            console.error('Login error:', error?.message);
            throw error || new Error("Something Wrong"); 
        });
};

const register = (name, username, email, password) => {
    return axiosInstance.post('/auth/register', { name, username, email, password })
        .then(response => response)
        .catch(error => {
            console.error('Register error:', error?.message);
            throw error || new Error("Something Wrong");
        });
};

const logout = () => {
    return axiosInstance.post('/users/logout')
        .then(response => response)
        .catch(error => {
            console.error('Logout error:', error?.message);
            throw error || new Error("Something Wrong");
        });
};

export const authApi = {
    login,
    register,
    logout
};

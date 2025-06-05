import  axiosInstance  from "../axiosInstance";

const login = async (email, password) => {
    return await axiosInstance.post('/auth/login', { email, password });
}

const register = async (name, username, email, password) => {
    return await axiosInstance.post('/auth/register', {name, username, email, password});
    
};

const logout = async () => {
    return await axiosInstance.post('/users/logout');
}

export const authApi = {
    login,
    register,
    logout
}
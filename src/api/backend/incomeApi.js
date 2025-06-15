import axiosInstance from "../axiosInstance";



const add = (source = "", categoryName = "", amount = 0.0, note , incomeDate = new Date().toISOString().split('T')[0]) => {

    var request = {
        source: source,
        categoryName:categoryName,
        amount: amount,
        note: note,
        incomeDate: incomeDate,
    }

    return axiosInstance.post('/income/add', request)
        .then(response => response)
        .catch(error => {
            console.error('Login error:', error?.message);
            throw error || new Error("Something Wrong"); 
        });
};

const getPage = () => {

    return axiosInstance.get('/income')
    .then(response => response)
    .catch(error => {
        console.error("Error : " + error);
        throw error || new Error("Something Wrong");
    })
};

export const incomeApi = {
    add,
    getPage
}
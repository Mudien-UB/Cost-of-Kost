import axiosInstance from "../axiosInstance";


const add = (reason = "", categoryName = "", amount = 0.0, note , expenseDate = new Date().toISOString().split('T')[0]) => {

    var request = {
        reason: reason,
        categoryName:categoryName,
        amount: amount,
        note: note,
        expenseDate: expenseDate,
    }

    return axiosInstance.post('/expense/add', request)
        .then(response => response)
        .catch(error => {
            console.error('Error:', error?.message);
            throw error || new Error("Something Wrong"); 
        });
};

const getPage = () => {

    return axiosInstance.get('/expense')
    .then(response => response)
    .catch(error => {
        console.error("Error : " + error);
        throw error || new Error("Something Wrong");
    })
};

export const expenseApi = {
    add,
    getPage
}
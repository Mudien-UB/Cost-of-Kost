import axiosInstance from "../axiosInstance"

const addExpense = async (date, amount, reason, categoryName, note) => {
    const body = {amount, reason, category_name: categoryName, date : toValidDate(date), note};

    return await axiosInstance.post("/finance/expense/add", body)
        .then(res => res)
        .catch(err => {
            console.log("failed : ", err?.message);
            throw err || new Error("something wrong");
        });
}

const addIncome = async (date, amount, source, categoryName, note) => {

    const body = {amount, source, category_name: categoryName, date: toValidDate(date), note};

    return await axiosInstance.post("/finance/income/add", body)
        .then(res => res)
        .catch(err => {
            console.log("failed : ", err?.message);
            throw err || new Error("something wrong");
        });
}

const toValidDate = (value) => {
    try {
        if (value instanceof Date && !isNaN(value)) {
        // value sudah Date dan valid
        return value;
        } else {
        const date = new Date(value);
        if (isNaN(date)) {
            throw new Error('Invalid date');
        }
        return date;
        }
    } catch (err) {
        throw err;
    }
};

export const financeRecorderApi = {
    addIncome,
    addExpense
}
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

const cleanParams = (params) =>
  Object.fromEntries(Object.entries(params).filter(([_, v]) => v != null));

const getPage = ({
  from,
  to,
  sortBy,
  page,
  size,
  asc,
  categoryName,
} = {}) => {
  const filteredParams = cleanParams({
    from,
    to,
    sortBy,
    page,
    size,
    asc,
    categoryName,
  });
  

  return axiosInstance
    .get('/expense', { params: filteredParams })
    .then((response) => response)
    .catch((error) => {
      console.error("Error:", error);
      throw error || new Error("Something went wrong");
    });
};

const getCategoryExpense = () => {

  return axiosInstance.get('/expense/categories')
                      .then(res => res.data)
                      .catch(err => {throw err})
}

const deleteExpense = (id) => {
  return axiosInstance.delete("/expense/" + id)
                      .then(res => res)
                      .catch(err => {throw err})
}


export const expenseApi = {
    add,
    getPage,
    getCategoryExpense,
    deleteExpense,
}
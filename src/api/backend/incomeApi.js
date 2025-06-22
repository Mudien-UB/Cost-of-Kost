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
    .get('/income', { params: filteredParams })
    .then((response) => response)
    .catch((error) => {
      console.error("Error:", error);
      throw error || new Error("Something went wrong");
    });
};

const getCategoryIncome = () => {

  return axiosInstance.get('/income/categories')
                      .then(res => res.data)
                      .catch(err => {throw err})
}

export const incomeApi = {
    add,
    getPage,
    getCategoryIncome
}
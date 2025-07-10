import axiosInstance from "../axiosInstance";

const financialInsight = () => {
    return axiosInstance.get('/analytics/insight')
                        .then(res => res.data)
                        .catch(err => {throw err});
}

const granularity = ({to, from, granularity}) => {
    const params = new URLSearchParams();
    if(to) params.append('to', to);
    if(from) params.append('from', from);
    if(granularity) params.append('granularity', granularity);
    console.log(params)
    return axiosInstance.get('/analytics/granularity', {params})
                        .then(res => res.data)
                        .catch(err => {throw err})
}

const totalCategory = ({monthAt}) => {
    const params = new URLSearchParams();
    if(monthAt) params.append('monthAt', monthAt);

    return axiosInstance.get('/analytics/totalExpensePerCategory', {params})
                        .then(res => res.data)
                        .catch(err => {throw err});
}

export const analyticsApi = {
    financialInsight,
    granularity,
    totalCategory
};
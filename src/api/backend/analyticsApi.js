import axiosInstance from "../axiosInstance";

const financialInsight = () => {
    return axiosInstance.get('/analytics/insight')
                        .then(res => res.data)
                        .catch(err => {throw err});
}

export const analyticsApi = {
    financialInsight
};
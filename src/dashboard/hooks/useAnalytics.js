import { useCallback, useState } from "react";
import { analyticsApi } from '../../api/backend/analyticsApi';

export default function useAnalytics() {

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle');

    const resetStatus = () => {
        setStatus('idle');
    };

    const getFinancialInsight = useCallback(async () => {
        try {
            setLoading(true);
            const res = await analyticsApi.financialInsight();
            setStatus('success');
            return res.data;

        } catch (err) {
            setStatus('error');
            throw err;
        } finally {
            setLoading(false);
        }
    },[]);

    const getExpenseOnRangeWithGranularity = useCallback(async ({to, from, granularity}) => {
        try{
            setLoading(true)
            const res = await analyticsApi.granularity({to, from, granularity});
            setStatus('success');
            return res.data;
        }catch(err){
            setStatus('error')
            throw err;
        }finally{
            setLoading(false);
        }
    },[]);

    const getTotalPerCategory = useCallback(async ({monthAt}) => {
        try {
            setLoading(true);
            const res = await analyticsApi.totalCategory({monthAt});
            setStatus('success');
            return res.data;

        } catch (error) {
            setStatus('error')
            throw error;
        }finally{
            setLoading(false);
        }
    },[])

    return {
        loading,
        status,
        getFinancialInsight,
        getExpenseOnRangeWithGranularity,
        getTotalPerCategory,
        resetStatus,

    }
}
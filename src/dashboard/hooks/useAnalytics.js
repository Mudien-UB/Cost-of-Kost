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


    return {
        loading,
        status,
        getFinancialInsight,
        resetStatus,

    }
}
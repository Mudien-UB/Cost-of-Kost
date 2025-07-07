import { useCallback, useState } from 'react';
import { incomeApi } from '../../api/backend/incomeApi';
import { expenseApi } from '../../api/backend/expenseApi';

export default function useFinance() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState(null);

    const addExpense = useCallback(async ({ reason, categoryName, amount, note, expenseDate }) => {
        try {
            setLoading(true);
            const response = await expenseApi.add(reason, categoryName, amount, note, expenseDate);
            setStatus('success');
            return response.data?.data;
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message || "Failed to add expense");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addIncome = useCallback(async ({ source, categoryName, amount, note, incomeDate }) => {
        try {
            setLoading(true);
            const response = await incomeApi.add(source, categoryName, amount, note, incomeDate);
            setStatus('success');
            return response.data?.data;
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message || "Failed to add income");
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const getListIncome = useCallback(async ({from, to, sortBy, page, size ,asc}) => {
        try {
            setLoading(true);
            const response = await incomeApi.getPage({from, to, sortBy, page, size ,asc});
            setStatus('success');
            return response.data;
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message || "Failed to get income data");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getListExpense = useCallback(async ({from, to, sortBy, page, size ,asc}) => {
        try {
            setLoading(true);
            const response = await expenseApi.getPage({from, to, sortBy, page, size ,asc});
            console.log(response.data)
            setStatus('success');
            return response.data;
        } catch (err) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message || "Failed to get expense data");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const resetStatus = () => {
        setStatus('idle');
        setErrorMessage(null);
    };

    const getCategoryExpense = useCallback(async () => {

        try {
            setLoading(true)
            const response = await expenseApi.getCategoryExpense();
            setStatus('success')
            return response.data;
        }catch ( err) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message || "Failed to get category");
            return null;
        }finally {
            setLoading(false);
        }

    }, []);
    const getCategoryIncome = useCallback(async () => {

        try {
            setLoading(true)
            const response = await incomeApi.getCategoryIncome();
            setStatus('success')
            return response.data;
        }catch ( err) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message || "Failed to get category");
            return null;
        }finally {
            setLoading(false);
        }

    }, []);

    const deleteExpense = useCallback(async (id) => {
        try{
            setLoading(true)
            const res = await expenseApi.deleteExpense(id);
            setStatus('success')
        }catch (err) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message)
        }finally {
            setLoading(false)
        }
    })
    const deleteIncome = useCallback(async (id) => {
        try{
            setLoading(true)
            const res = await incomeApi.deleteIncome(id);
            setStatus('success')
        }catch (err) {
            setStatus('error');
            setErrorMessage(err.response?.data?.message)
        }finally {
            setLoading(false)
        }
    })

    return {
        loading,
        status,
        errorMessage,
        resetStatus,
        addExpense,
        addIncome,
        getListExpense,
        getListIncome,
        getCategoryExpense,
        getCategoryIncome,
        deleteExpense,
        deleteIncome,
    };
}

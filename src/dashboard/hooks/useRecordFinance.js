import { useState } from 'react';
import { financeRecorderApi } from '../../api/backend/financeRecorderApi';

export default function useFinanceRecorder() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitExpense = async (date, amount, reason, categoryName, note) => {
        setLoading(true);
        setError(null);
        try {
            const res = await financeRecorderApi.addExpense(date, amount, reason, categoryName, note);
            return res;
        } catch (err) {
            setError(err?.message || "Something went wrong");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const submitIncome = async (date, amount, source, categoryName, note) => {
        setLoading(true);
        setError(null);
        try {
            const res = await financeRecorderApi.addIncome(date, amount, source, categoryName, note);
            return res;
        } catch (err) {
            setError(err?.message || "Something went wrong");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        submitExpense,
        submitIncome,
        loading,
        error,
    };
}

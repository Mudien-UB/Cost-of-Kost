import { useCallback, useState } from 'react';
import { incomeApi } from '../../api/backend/incomeApi';

export default function useFinanceRecorder() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState(null);


    const addExpense = useCallback( async ({reason, categoryName, amount, note, expenseDate}) => {
        try{
            setLoading(true);
            const response = await expenseApi.add(reason,categoryName,amount,note, expenseDate);

            return response.data?.data;

        }catch (err){
            setStatus("error");
            setErrorMsg(err.response?.data?.message || "failed add expense");
            throw err;
        }finally{
            setLoading(false);
        }

    });

    const addIncome = useCallback( async ({source, categoryName, amount, note, incomeDate}) => {
        try{
            setLoading(true);
            const response = await incomeApi.add(source,categoryName,amount,note, incomeDate);

            return response.data?.data;

        }catch (err){
            setStatus("error");
            setErrorMsg(err.response?.data?.message || "failed add expense");
            throw err;
        }finally{
            setLoading(false);
        }

    });


    const resetStatus = () =>{
        setErrorMsg(null);
    }

    

    return {
        loading,
        status,
        errorMsg,
        resetStatus,
        addExpense,
        addIncome
    };
}

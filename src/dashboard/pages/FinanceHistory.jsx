import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import useFinance from "../hooks/useFinance";
import TransactionHistories from "../components/organisms/TransactionHistories";
import MiniNav from "../components/molecules/MiniNav";

export default function FinanceHistory() {
  const [expensesData, setExpensesData] = useState([]);
  const [incomesData, setIncomesData] = useState([]);

  const [expenseError, setExpenseError] = useState(null);
  const [incomeError, setIncomeError] = useState(null);

  const [activeTab, setActiveTab] = useState("expense");

  const [requestParam, setRequestParam] = useState({
    from: null,
    to: null,
    sortBy: null,
    page: null,
    size: null,
    asc: true,
  });

  const resetParam = () => {
    setRequestParam({
      from: null,
      to: null,
      sortBy: null,
      page: null,
      size: null,
      asc: true,
    });
  };

  const {
    loading,
    status,
    errorMessage,
    getListExpense,
    getListIncome,
    resetStatus,
  } = useFinance();

  const fetchExpensesData = async () => {
    try {
      const response = await getListExpense(requestParam);
      setExpensesData(response.content);
      setExpenseError(null);
    } catch (err) {
      setExpenseError(errorMessage || "Failed to load expense data");
    } finally {
      resetStatus();
    }
  };

  const fetchIncomesData = async () => {
    try {
      const response = await getListIncome(requestParam);
      console.log(response)
      setIncomesData(response.content);
      setIncomeError(null);
    } catch (err) {
      setIncomeError(errorMessage || "Failed to load income data");
    } finally {
      resetStatus();
    }
  };

  useEffect(() => {
    if (activeTab === "expense") {
      fetchExpensesData();
    } else {
      fetchIncomesData();
    }
  }, [activeTab]);

  return (
    <DashboardLayout className="pt-14 min-h-screen">
      <section className="w-full p-4">


          <MiniNav 
            navigate={[
              {
                link: "expense",
                title:"Pengeluaran"
              },
              {
                link: "income",
                title: "Pemasukan",
              }
            ]}
            onClick={(val) => setActiveTab(val)}
            isActive={activeTab}

          />        
        {activeTab === "expense" && expenseError && (
          <p className="text-red-500 mb-2">{expenseError}</p>
        )}
        {activeTab === "income" && incomeError && (
          <p className="text-red-500 mb-2">{incomeError}</p>
        )}

        <TransactionHistories
          data={activeTab === "expense" ? expensesData : incomesData}
          title={activeTab === "expense" ? "Data Pengeluaran" : "Data Pemasukan"}
          type={activeTab === "expense" ? "expense" : "income"}
        />
      </section>
    </DashboardLayout>
  );
}

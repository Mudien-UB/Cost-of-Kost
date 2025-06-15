import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import useFinance from "../hooks/useFinance";
import TransactionHistories from "../components/organisms/TransactionHistories";

export default function FinanceAnalystPage() {
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
    <DashboardLayout className="pt-16 min-h-screen">
      <section className="w-full p-4">
        <h1 className="text-3xl font-medium mb-5 px-4 underline">
          Histori Keuangan
        </h1>

        <div className="flex justify-center border-b border-gray-300 mb-4">
          <button
            onClick={() => setActiveTab("expense")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "expense"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-indigo-500"
            }`}
          >
            Pengeluaran
          </button>
          <button
            onClick={() => setActiveTab("income")}
            className={`ml-4 px-4 py-2 text-sm font-medium ${
              activeTab === "income"
                ? "border-b-2 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-indigo-500"
            }`}
          >
            Pemasukan
          </button>
        </div>

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

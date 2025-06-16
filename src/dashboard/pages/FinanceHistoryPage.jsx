import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import useFinance from "../hooks/useFinance";
import TransactionHistories from "../components/organisms/TransactionHistories";
import MiniNav from "../components/molecules/MiniNav";
import PaginationNav from "../components/molecules/PaginationNav";

export default function FinanceHistoryPage() {
  const [expensesData, setExpensesData] = useState([]);
  const [incomesData, setIncomesData] = useState([]);

  const [expenseError, setExpenseError] = useState(null);
  const [incomeError, setIncomeError] = useState(null);

  const [activeTab, setActiveTab] = useState("expense");

  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
    isLast: true,
  });

  const [requestParam, setRequestParam] = useState({
    from: null,
    to: null,
    sortBy: null,
    page: 1,    // default page
    size: 5,    // jumlah data per halaman
    asc: true,
  });

  const resetParam = () => {
    setRequestParam({
      from: null,
      to: null,
      sortBy: null,
      page: 1,
      size: 5,
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
      setPagination({
        page: response.page,
        totalPage: response.totalPages,
        isLast: response.isLast,
      });
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
      setIncomesData(response.content);
      setPagination({
        page: response.page,
        totalPage: response.totalPages,
        isLast: response.isLast,
      });
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
  }, [activeTab, requestParam.page]); // trigger fetch saat tab/page berubah

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPage) {
      setRequestParam((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.page > 1) {
      setRequestParam((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  return (
    <DashboardLayout className="pt-14 min-h-screen">
      <section className="w-full p-4">
        <MiniNav
          navigate={[
            { link: "expense", title: "Pengeluaran" },
            { link: "income", title: "Pemasukan" },
          ]}
          onClick={(val) => {
            setActiveTab(val);
            setRequestParam((prev) => ({ ...prev, page: 1 }));
          }}
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

        <PaginationNav
          currentPage={pagination.page}
          totalPage={pagination.totalPage}
          onNext={handleNextPage}
          onPrev={handlePrevPage}
        />
      </section>
    </DashboardLayout>
  );
}

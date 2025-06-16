import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import useFinance from "../hooks/useFinance";
import TransactionHistories from "../components/organisms/TransactionHistories";
import MiniNav from "../components/molecules/MiniNav";
import PaginationNav from "../components/molecules/PaginationNav";
import { GrAscending } from "react-icons/gr";
import { PiSortAscendingBold } from "react-icons/pi";
import FilterIntervalDate from "../components/molecules/FilterIntervalDate";

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
    page: 1,
    size: 5,
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
  }, [activeTab, requestParam]);

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

  const sortirOption = [
                {
                  value: "default",
                  title: "default"
                },
                {
                  value:"amount",
                  title:"jumlah",
                },{
                  value:"create_time",
                  title:"tanggal catat"
                }
              ]

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
            setRequestParam((prev) => ({
              ...prev,
              page: 1,
            }));
          }}
          isActive={activeTab}
        />
        <div className="w-full px-10 py-4 bg-white shadow-md rounded-xl flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <select
              value={requestParam.sortBy || ""}
              onChange={(e) => {
                const value = e.target.value === "default" ? null : e.target.value;
                setRequestParam((prev) => ({
                  ...prev,
                  sortBy: value,
                  page: 1,
                }));
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {sortirOption.map((value, index) => (
                <option value={value.value} key={index}>
                  {value.value === "default" ? "Sortir Default" : `Sortir berdasarkan ${value.title}`}
                </option>
              ))}
            </select>

            <label className="inline-flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={requestParam.asc}
                onChange={(e) =>
                  setRequestParam((prev) => ({
                    ...prev,
                    asc: e.target.checked,
                    page: 1,
                  }))
                }
                className="hidden"
              />
              <span className="p-2 rounded hover:bg-gray-100 border border-gray-300">
                <PiSortAscendingBold className={`text-2xl transition-transform duration-300 ${requestParam.asc ? "rotate-0" : "rotate-180"}`} />
              </span>
            </label>
          </div>

          <div className="flex flex-row gap-3 justify-end">
            <FilterIntervalDate
              fromDate={requestParam.from}
              toDate={requestParam.to}
              onChange={({ fromDate, toDate }) =>
                setRequestParam((prev) => ({
                  ...prev,
                  from: fromDate,
                  to: toDate,
                  page: 1,
                }))
              }
            />
            {requestParam.from && (


              <button
                type="button"
                onClick={() => resetParam()}
                className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Reset
              </button>
            )
            }
          </div>
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

import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import useFinance from '../../hooks/useFinance';

export default function FormExpence() {
  const [expenseData, setExpenseData] = useState({
    expenseDate: new Date().toISOString().split('T')[0],
    amount: '',
    reason: '',
    categoryName: '',
    note: ''
  });

  const { addExpense, loading,resetStatus } = useFinance();

  const defaultCategories = ["tagihan", "makanan", "jajan", "transportasi","lainnya"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { expenseDate, amount, reason, categoryName, note } = expenseData;

    if (!amount || !reason || !categoryName) {
      alert('Harap isi jumlah, tujuan, dan kategori.');
      return;
    }

    try {
      await addExpense({ reason, categoryName, amount: parseFloat(amount), note, expenseDate });
      alert("Pengeluaran berhasil disimpan!");
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan pengeluaran");
    }
  };

  const resetForm = () => {
    resetStatus();
    setExpenseData({
      expenseDate: new Date().toISOString().split('T')[0],
      amount: '',
      reason: '',
      categoryName: '',
      note: ''
    });
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl shadow-blue-900">
      <h2 className="text-2xl font-semibold text-center text-blue-900/70 mb-6">Catat Pengeluaran</h2>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">

        <label className="block">
          <span className="text-blue-900/70 font-bold">Tanggal</span>
          <input
            type="date"
            name="expenseDate"
            value={expenseData.expenseDate}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800/60"
          />
        </label>

        <label className="block">
          <span className="text-blue-900/70 font-bold">Jumlah (Rp)</span>
          <input
            type="number"
            name="amount"
            value={expenseData.amount}
            onChange={handleChange}
            placeholder="Contoh: 50000"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800/60"
          />
        </label>

        <label className="block">
          <span className="text-blue-900/70 font-bold">Tujuan</span>
          <input
            type="text"
            name="reason"
            value={expenseData.reason}
            onChange={handleChange}
            placeholder="Contoh: Beli bensin"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800/60"
          />
        </label>

        <label className="block">
          <span className="text-blue-900/70 font-bold">Kategori</span>
          <select
            name="categoryName"
            value={expenseData.categoryName}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800/60"
          >
            <option value="" disabled>Pilih kategori</option>
            {defaultCategories.map((cat, idx) => (
              <option key={idx} value={cat} className="capitalize">
                {cat}
              </option>
            ))}
            <option value="lainnya">Lainnya</option>
          </select>
        </label>

        <label className="block">
          <span className="text-blue-900/70 font-bold">Keterangan (Opsional)</span>
          <textarea
            name="note"
            value={expenseData.note}
            onChange={handleChange}
            placeholder="Catatan tambahan jika perlu"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800/60"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`flex items-center self-end gap-2 p-4 text-white rounded-lg transition duration-300 
            ${loading ? 'bg-blue-400' : 'bg-blue-900/70 hover:bg-blue-900'}`}
        >
          <FaSave size={30} />
          <span className="text-lg font-semibold">
            {loading ? 'Menyimpan...' : 'Simpan'}
          </span>
        </button>
      </form>
    </div>
  );
}

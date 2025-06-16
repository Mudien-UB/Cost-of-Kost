import React, { useState } from 'react';
import { FaSave } from 'react-icons/fa';
import useFinance from '../../hooks/useFinance';
import FormField from '../atoms/FormField';

export default function FormExpence() {
  const [expenseData, setExpenseData] = useState({
    expenseDate: new Date().toISOString().split('T')[0],
    amount: '',
    reason: '',
    categoryName: '',
    customCategory: '',
    note: ''
  });

  const { addExpense, loading, resetStatus } = useFinance();

  const defaultCategories = ["tagihan", "makanan", "jajan", "transportasi", "lainnya"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { expenseDate, amount, reason, categoryName, customCategory, note } = expenseData;

    if (!amount || !reason || !categoryName) {
      alert('Harap isi jumlah, tujuan, dan kategori.');
      return;
    }

    const finalCategory = categoryName === 'lainnya' ? customCategory.trim() : categoryName;
    if (categoryName === 'lainnya' && !finalCategory) {
      alert('Harap isi kategori lainnya.');
      return;
    }

    try {
      await addExpense({
        reason,
        categoryName: finalCategory,
        amount: parseFloat(amount),
        note,
        expenseDate
      });
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
      customCategory: '',
      note: ''
    });
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl shadow-blue-900">
      <h2 className="text-2xl font-semibold text-center text-blue-900/70 mb-6">Catat Pengeluaran</h2>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">

        <FormField
          label="Tanggal"
          name="expenseDate"
          type="date"
          value={expenseData.expenseDate}
          onChange={handleChange}
        />

        <FormField
          label="Jumlah (Rp)"
          name="amount"
          type="number"
          placeholder="Contoh: 50000"
          value={expenseData.amount}
          onChange={handleChange}
        />

        <FormField
          label="Tujuan"
          name="reason"
          type="text"
          placeholder="Contoh: Beli bensin"
          value={expenseData.reason}
          onChange={handleChange}
        />

        <FormField
          label="Kategori"
          name="categoryName"
          as="select"
          value={expenseData.categoryName}
          onChange={handleChange}
          options={defaultCategories}
        />

        {/* Input tambahan saat memilih kategori "lainnya" */}
        {expenseData.categoryName === 'lainnya' && (
          <FormField
            label="Kategori Lainnya"
            name="customCategory"
            type="text"
            placeholder="Masukkan nama kategori"
            value={expenseData.customCategory}
            onChange={handleChange}
          />
        )}

        <FormField
          label="Keterangan (Opsional)"
          name="note"
          as="textarea"
          placeholder="Catatan tambahan jika perlu"
          value={expenseData.note}
          onChange={handleChange}
        />

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

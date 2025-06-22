import React, { useEffect, useState } from 'react';
import { FaSave } from 'react-icons/fa';
import useFinance from '../../hooks/useFinance';
import FormField from '../atoms/FormField';

export default function FormIncome() {
  const [incomeData, setIncomeData] = useState({
    incomeDate: new Date().toISOString().split('T')[0],
    amount: '',
    source: '',
    categoryName: '',
    customCategory: '',
    note: ''
  });

  const [categoryDisplay, setCategoryDisplay] = useState([]);

  const { addIncome, loading, resetStatus, getCategoryIncome } = useFinance();

  const defaultCategories = ['gaji', 'hadiah', 'saku', 'lainnya'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncomeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { incomeDate, amount, source, categoryName, customCategory, note } = incomeData;

    if (!amount || !source || !categoryName) {
      alert('Harap isi jumlah, sumber, dan kategori.');
      return;
    }

    const finalCategory = categoryName.toLowerCase() === 'lainnya' ? customCategory.trim() : categoryName;
    if (categoryName.toLowerCase() === 'lainnya' && !finalCategory) {
      alert('Harap isi kategori lainnya.');
      return;
    }

    try {
      await addIncome({
        source,
        categoryName: finalCategory,
        amount: parseFloat(amount),
        note,
        incomeDate
      });
      alert("Pemasukan berhasil disimpan!");
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan pemasukan");
    }
  };

  const resetForm = () => {
    resetStatus();
    setIncomeData({
      incomeDate: new Date().toISOString().split('T')[0],
      amount: '',
      source: '',
      categoryName: '',
      customCategory: '',
      note: ''
    });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoryIncome();
        const backendCategories = res.map(cat => cat.name.toLowerCase()) || [];

        let combined = [...backendCategories];

        if (combined.length < 3) {
          const needed = defaultCategories.filter(
            cat => cat !== 'lainnya' && !combined.includes(cat)
          );
          const fillCount = 3 - combined.length;
          combined = [...combined, ...needed.slice(0, fillCount)];
        }

        if (!combined.includes('lainnya')) {
          combined.push('lainnya');
        }

        setCategoryDisplay(combined);
      } catch (err) {
        console.error(err);
        setCategoryDisplay(defaultCategories);
      } finally {
        resetStatus();
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl shadow-green-900">
      <h2 className="text-2xl font-semibold text-center text-blue-900/70 mb-6">Catat Pemasukan</h2>

      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col">

        <FormField
          label="Tanggal"
          name="incomeDate"
          type="date"
          value={incomeData.incomeDate}
          onChange={handleChange}
        />

        <FormField
          label="Jumlah (Rp)"
          name="amount"
          type="number"
          placeholder="Contoh: 50000"
          value={incomeData.amount}
          onChange={handleChange}
        />

        <FormField
          label="Sumber"
          name="source"
          type="text"
          placeholder="Contoh: Bonus proyek"
          value={incomeData.source}
          onChange={handleChange}
        />

        <FormField
          label="Kategori"
          name="categoryName"
          as="select"
          value={incomeData.categoryName}
          onChange={handleChange}
          options={categoryDisplay.map(cat => cat.charAt(0).toUpperCase() + cat.slice(1))}
        />

        {incomeData.categoryName?.toLowerCase() === 'lainnya' && (
          <FormField
            label="Kategori Lainnya"
            name="customCategory"
            type="text"
            placeholder="Masukkan kategori khusus"
            value={incomeData.customCategory}
            onChange={handleChange}
          />
        )}

        <FormField
          label="Keterangan (Opsional)"
          name="note"
          as="textarea"
          placeholder="Catatan tambahan jika perlu"
          value={incomeData.note}
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

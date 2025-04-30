import React, { useState } from 'react';

export default function FormIncome() {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const sourceOption = [
    { value: 'Salary', label: 'Gaji/Saku Bulanan' },
    { value: 'Gift', label: 'Hadiah' },
    { value: 'Other', label: 'Lainnya' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount === '' || isNaN(amount)) {
      setError('Jumlah pemasukan harus berupa angka.');
      return;
    }

    if (source === '') {
      setError('Sumber pemasukan wajib diisi.');
      return;
    }

    setError('');

    const data = {
      date,
      amount,
      source,
      description,
    };

    console.log('Data pemasukan:', data);

    setDate('');
    setAmount('');
    setSource('');
    setDescription('');
  };

  const handleSourceChange = (e) => {
    const selectedSource = e.target.value;
    setSource(selectedSource);

    if (selectedSource !== 'Other') {
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-blue-900/70 mb-4">Catat Pemasukan</h2>

      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Tanggal Pemasukan</span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Jumlah Pemasukan (Rp)</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Contoh: 50000"
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Sumber Pemasukan</span>
        <select
          value={source}
          onChange={handleSourceChange}
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        >
          <option value="" disabled>Pilih sumber</option>
          {sourceOption.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        {source === 'Other' && (
          <input
            type="text"
            value={source === 'Other' ? '' : source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Tuliskan sumber pemasukan"
            className="border border-blue-900/50 rounded-lg px-4 py-2 mt-2"
          />
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Deskripsi (Opsional)</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tuliskan deskripsi pemasukan jika ada"
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        />
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="bg-blue-900/70 hover:bg-blue-900 text-white rounded-lg px-4 py-2 font-bold"
      >
        Simpan
      </button>
    </form>
  );
}

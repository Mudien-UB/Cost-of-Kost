import React, { useState } from 'react';
import { IoAddCircleSharp, IoSaveSharp } from 'react-icons/io5';

export default function FormExpence() {
  const [tanggal, setTanggal] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false); // Menandai apakah verifikasi diperlukan

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tanggal || !jumlah || !judul || !kategori) {
      alert("Harap isi semua field yang wajib.");
      return;
    }

    const newExpense = {
      tanggal,
      jumlah: parseFloat(jumlah),
      judul,
      kategori,
      keterangan,
    };

    setExpenses([...expenses, newExpense]);

    alert("Pengeluaran berhasil ditambahkan!");

    // Reset form after submission
    setTanggal('');
    setJumlah('');
    setJudul('');
    setKategori('');
    setKeterangan('');
    setIsVerifying(true); // Menandakan bahwa sekarang pengguna perlu melakukan verifikasi
  };

  const handleSubmitAll = (e) => {
    e.preventDefault();

    if (expenses.length === 0) {
      alert("Tidak ada pengeluaran yang tercatat.");
      return;
    }

    alert("Semua pengeluaran berhasil disimpan!");

    // Reset the expenses after saving
    setExpenses([]);
    setIsVerifying(false); // Reset status verifikasi
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Catat Pengeluaran</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700 font-medium">Tanggal</span>
          <input
            type="date"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Jumlah (Rp)</span>
          <input
            type="number"
            value={jumlah}
            onChange={(e) => setJumlah(e.target.value)}
            placeholder="Contoh: 50000"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Tujuan</span>
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            placeholder="Contoh: Beli bensin"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Kategori</span>
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Pilih kategori</option>
            <option value="transportasi">Transportasi</option>
            <option value="makanan">Makanan</option>
            <option value="hiburan">Hiburan</option>
            <option value="tagihan">Tagihan</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700 font-medium">Keterangan (Opsional)</span>
          <textarea
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
            placeholder="Catatan tambahan jika perlu"
            className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <div className="flex flex-col gap-6 mt-6 justify-center">
          <button
            type="submit"
            className="flex items-center gap-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            <IoAddCircleSharp size={30} />
            <span className="text-lg font-semibold">Catat Pengeluaran</span>
          </button>

          {/* Tombol simpan semua hanya tampil jika ada pengeluaran yang belum disimpan */}
          {isVerifying && (
            <button
              type="button"
              onClick={handleSubmitAll}
              className="flex items-center gap-2 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
            >
              <IoSaveSharp size={30} />
              <span className="text-lg font-semibold">
                Simpan Semua Pengeluaran
              </span>
            </button>
          )}
        </div>

      </form>

      {expenses.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Pengeluaran yang Tercatat</h3>
          <ul className="space-y-4 mt-4">
            {expenses.map((expense, index) => (
              <li key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                <p className="font-semibold text-gray-800">{expense.judul} - Rp {expense.jumlah}</p>
                <p className="text-sm text-gray-600">{expense.tanggal} | {expense.kategori}</p>
                <p className="text-sm text-gray-500">{expense.keterangan}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

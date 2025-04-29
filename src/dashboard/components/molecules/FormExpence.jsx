import React, { useState } from 'react'

export default function FormExpence() {
  const [tanggal, setTanggal] = useState('');
  const [jumlah, setJumlah] = useState('');
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('');
  const [keterangan, setKeterangan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tanggal || !jumlah || !judul || !kategori) {
      alert("Harap isi semua field yang wajib.");
      return;
    }

    const data = {
      tanggal,
      jumlah: parseFloat(jumlah),
      judul,
      kategori,
      keterangan,
    };

    console.log("Data Form:", data);
    alert("Data pengeluaran berhasil disimpan!");

    // Reset form
    setTanggal('');
    setJumlah('');
    setJudul('');
    setKategori('');
    setKeterangan('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-xl shadow">
      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Tanggal Pengeluaran</span>
        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Jumlah Pengeluaran (Rp)</span>
        <input
          type="number"
          value={jumlah}
          onChange={(e) => setJumlah(e.target.value)}
          placeholder="Contoh: 50000"
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Tujuan / Judul Pengeluaran</span>
        <input
          type="text"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Contoh: Beli bensin"
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Kategori</span>
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        >
          <option value="" disabled>Pilih kategori</option>
          <option value="transportasi">Transportasi</option>
          <option value="makanan">Makanan</option>
          <option value="hiburan">Hiburan</option>
          <option value="tagihan">Tagihan</option>
          <option value="lainnya">Lainnya</option>
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Keterangan (Opsional)</span>
        <textarea
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          placeholder="Tuliskan catatan tambahan jika perlu"
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        />
      </label>

      <button
        type="submit"
        className="bg-blue-900/70 hover:bg-blue-900 text-white rounded-lg px-4 py-2 font-bold"
      >
        Simpan
      </button>
    </form>
  );
}

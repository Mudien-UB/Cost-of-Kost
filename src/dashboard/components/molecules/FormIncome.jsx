import React, { useState } from "react";
import useFinanceRecorder from "../../hooks/useRecordFinance";

const today = new Date().toISOString().split("T")[0];

export default function FormIncome() {
  const [date, setDate] = useState(today);
  const [amount, setAmount] = useState("");
  const [source, setSource] = useState("");
  const [sourceCategory, setSourceCategory] = useState("");
  const [customCategory, setCustomCategory] = useState(""); // untuk "Other"
  const [description, setDescription] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { submitIncome, loading, error } = useFinanceRecorder();

  const sourceCategoryOption = [
    { value: "Salary", label: "Gaji/Saku Bulanan" },
    { value: "Gift", label: "Hadiah" },
    { value: "Other", label: "Lainnya" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (amount === "" || isNaN(amount)) {
      setErrorMsg("Jumlah pemasukan harus berupa angka.");
      return;
    }

    if (source === "") {
      setErrorMsg("Sumber pemasukan harap diisi.");
      return;
    }

    if (sourceCategory === "") {
      setErrorMsg("Jenis pemasukan wajib diisi.");
      return;
    }

    setErrorMsg("");

    try {
      const finalCategory =
        sourceCategory === "Other" ? customCategory : sourceCategory;

      await submitIncome(date, amount, source, finalCategory, description);

      alert("Pemasukan berhasil disimpan!");

      // Reset form
      setDate(today);
      setAmount("");
      setSource("");
      setSourceCategory("");
      setCustomCategory("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert(`Gagal menyimpan pemasukan: ${err.message}`);
    }
  };

  const handleSourceCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSourceCategory(selectedCategory);

    // Kosongkan customCategory saat tidak memilih "Other"
    if (selectedCategory !== "Other") {
      setCustomCategory("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-xl shadow"
    >
      <h2 className="text-2xl font-bold text-blue-900/70 mb-4">
        Catat Pemasukan
      </h2>

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
        <span className="text-blue-900/70 font-bold">
          Jumlah Pemasukan (Rp)
        </span>
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
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Contoh: Gaji dari bos"
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="text-blue-900/70 font-bold">Jenis Pemasukan</span>
        <select
          value={sourceCategory}
          onChange={handleSourceCategoryChange}
          className="border border-blue-900/50 rounded-lg px-4 py-2"
        >
          <option value="" disabled>
            Pilih Pemasukan
          </option>
          {sourceCategoryOption.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {sourceCategory === "Other" && (
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="Tuliskan jenis pemasukan"
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

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-900/70 hover:bg-blue-900 text-white rounded-lg px-4 py-2 font-bold disabled:opacity-50"
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </button>
    </form>
  );
}

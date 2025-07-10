import React from 'react';

export default function FormField({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  as = 'input',
  options = [],
  disabled = false,
  textColour = 'text-blue-900/70',
  ...props
}) {
  const baseInputClass =
    "block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800/60 " + textColour;

  // formatter untuk angka ke ribuan
  function formatToRupiah(num) {
    if (!num) return '';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  return (
    <label className="block">
      <span className={`font-bold ${textColour}`}>{label}</span>

      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={"mt-2 " + baseInputClass}
          disabled={disabled}
          {...props}
        />
      ) : as === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={"mt-2 " + baseInputClass}
          disabled={disabled}
        >
          <option value="" disabled>Pilih kategori</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      ) : as === 'rupiah' ? (
        <div className="mt-2 relative flex items-center">
          <input
            type="text"
            name={name}
            value={formatToRupiah(value)}
            onChange={onChange}
            placeholder={placeholder}
            className={baseInputClass}
            disabled={disabled}
            {...props}
          />
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={"mt-2 " + baseInputClass}
          disabled={disabled}
          {...props}
        />
      )}
    </label>
  );
}

// components/atoms/FormField.jsx
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
  textColour='text-blue-900/70',
  ...props
}) {
  const commonClass = "mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800/60" + textColour;

  return (
    <label className="block">
      <span className={`font-bold ${textColour}`}>{label}</span>

      {as === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={commonClass}
          {...props}
        />
      ) : as === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={commonClass}
          disabled={disabled}
        >
          <option value="" disabled>Pilih kategori</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={commonClass}
          {...props}
        />
      )}
    </label>
  );
}

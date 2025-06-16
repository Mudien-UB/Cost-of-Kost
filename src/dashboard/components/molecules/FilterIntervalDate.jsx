import React from 'react';

export default function FilterIntervalDate({ fromDate, toDate, onChange, className }) {
  const handleFromDateChange = (e) => {
    const newFromDate = e.target.value;
    const dateFrom = new Date(newFromDate);
    const dateTo = new Date(toDate);

    if (toDate && dateFrom > dateTo) {
      // Switch tanggal
      onChange({ fromDate: toDate, toDate: newFromDate });
    } else {
      onChange({ fromDate: newFromDate, toDate });
    }
  };

  const handleToDateChange = (e) => {
    const newToDate = e.target.value;
    const dateFrom = new Date(fromDate);
    const dateTo = new Date(newToDate);

    if (fromDate && dateFrom > dateTo) {
      // Switch tanggal
      onChange({ fromDate: newToDate, toDate: fromDate });
    } else {
      onChange({ fromDate, toDate: newToDate });
    }
  };

  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <div className="flex items-center gap-2 text-sm">
        <label htmlFor="from-date" className="font-medium text-blue-900/70">Dari</label>
        <input
          id="from-date"
          type="date"
          value={fromDate || ''}
          onChange={handleFromDateChange}
          className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex items-center gap-2 text-sm">
        <label htmlFor="to-date" className="font-medium text-blue-900/70">Sampai</label>
        <input
          id="to-date"
          type="date"
          value={toDate || ''}
          onChange={handleToDateChange}
          className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

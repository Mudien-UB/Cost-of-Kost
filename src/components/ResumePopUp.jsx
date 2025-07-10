import React from 'react';

export default function ResumePopUp({ data, onClose, title }) {
  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-transparent">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl max-h-[80vh] flex flex-col">
        <header className="flex justify-between items-center p-4 border-b-2 border-blue-800">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-blue-500 hover:text-blue-100"
            onClick={onClose}
          >
            ✕
          </button>
        </header>
        <div className="p-4 overflow-y-scroll">
          <p className="whitespace-pre-wrap text-sm">{data}</p>
        </div>
        <footer className="flex justify-end p-4 border-t-2 border-blue-800">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </div>
    </section>
  );
}

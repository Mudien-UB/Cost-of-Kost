import React from 'react'
import { BiTrashAlt } from 'react-icons/bi';

export default function ListContainer({ index, children, className, OnDelete, OnClick }) {
  return (
    <div
      className={`w-full px-4 py-3 flex items-start justify-between gap-4 relative ${className}`}
      onClick={OnClick}
    >
      <div className="flex w-full gap-4 items-start">
        <h1 className="text-lg font-bold text-blue-900/60 w-6 self-center text-center">{`${index}.`}</h1>
        <div className="w-full">{children}</div>
      </div>
      <div className="w-max flex flex-col md:flex-row gap-2 pt-1">
        
        <button
          onClick={(e) => { e.stopPropagation(); OnDelete(); }}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          <BiTrashAlt size={20} />
        </button>
      </div>
    </div>
  );
}

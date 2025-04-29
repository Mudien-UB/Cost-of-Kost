import React from 'react'

export default function CardContainer({children, title}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 h-56 flex flex-col items-center justify-center gap-3 relative">
          <h1 className="text-2xl absolute top-5 left-5 font-bold text-blue-900/50">{title}</h1>
          {children}
        </div>
  )
}

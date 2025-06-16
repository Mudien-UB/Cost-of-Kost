import React from 'react'

export default function MiniNav({ navigate = [], isActive, onClick }) {
    return (
        <div className="flex justify-center border-b border-gray-300 mb-4">
            {navigate.map((item, index) => (
                <button
                    key={index}
                    onClick={() => onClick(item.link)}
                    className={`px-4 py-2 text-sm font-medium ${
                        isActive === item.link
                            ? "border-b-2 border-indigo-600 text-indigo-600"
                            : "text-gray-600 hover:text-indigo-500"
                    }`}
                >
                    {item.title}
                </button>
            ))} 
        </div>
    )
}

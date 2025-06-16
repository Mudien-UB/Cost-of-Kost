import React from 'react';

export default function PaginationNav({ currentPage = 1, totalPage = 1, onPrev, onNext }) {



    return (
        <div className="flex justify-center items-center gap-4 mt-6">
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={onPrev}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            <span className="text-sm font-medium">
                Page {currentPage} of {totalPage}
            </span>
            <button
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                onClick={onNext}
                disabled={currentPage === totalPage}
            >
                Next
            </button>
        </div>
    );
}

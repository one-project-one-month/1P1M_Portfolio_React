import React from "react";

export default function Pagination({ totalPages, currentPage, onPageChange }) {
    return (
        <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-4 py-2 border-2 rounded-lg text-white transition-colors ${currentPage === i + 1
                        ? "bg-[#9C39FC] border-[#9C39FC] font-semibold"
                        : "border-slate-600 hover:bg-slate-700"
                        }`}
                >
                    {i + 1}
                </button>


            ))}
        </div>
    );
}

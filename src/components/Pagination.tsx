"use client";

interface PaginationProps {
  page: number;
  total: number;
  perPage: number;
  onPage: (p: number) => void;
}

export default function Pagination({ page, total, perPage, onPage }: PaginationProps) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`w-8 h-8 rounded-md text-sm font-medium transition-colors cursor-pointer ${
            p === page
              ? "bg-blue-600 text-white"
              : "text-gray-400 hover:bg-white/10"
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

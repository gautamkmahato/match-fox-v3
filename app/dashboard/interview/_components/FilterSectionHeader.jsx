'use client';

import { ListFilter, CheckCircle, XCircle, BoxIcon } from 'lucide-react';

export default function FilterSectionHeader() {
  return (
    <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-4 bg-white mb-6">
      {/* Left: Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 sm:mb-0">All Interviews</h2>

      {/* Right: Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-800 border border-gray-500 rounded-md hover:bg-gray-100 transition">
          <ListFilter className="w-3 h-3" />
          All
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-800 border border-gray-500 rounded-md hover:bg-green-100 transition">
          <CheckCircle className="w-3 h-3" />
          Completed
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-800 border border-gray-500 rounded-md hover:bg-blue-100 transition">
          <BoxIcon className="w-3 h-3" />
          In Progress
        </button>
        <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-800 border border-gray-500 rounded-md hover:bg-red-100 transition">
          <XCircle className="w-3 h-3" />
          Cancelled
        </button>
      </div>
    </section>
  );
}

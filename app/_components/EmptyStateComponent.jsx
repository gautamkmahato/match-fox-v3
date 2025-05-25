'use client';

import { FileX, PackageSearch, Search } from 'lucide-react';

const iconMap = {
  'not-found': <FileX className="w-10 h-10 text-gray-400" />,
  'empty': <PackageSearch className="w-10 h-10 text-gray-400" />,
  'search': <Search className="w-10 h-10 text-gray-400" />,
};

export default function EmptyStateComponent({
  icon = 'empty',
  title = 'Nothing Found',
  description = 'Looks like there’s nothing here yet.',
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 shadow-sm text-center max-w-md mx-auto">
      <div className="mb-4">
        {iconMap[icon]}
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

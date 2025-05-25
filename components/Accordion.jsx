'use client'

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Accordion({ header, description }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-md transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="w-full bg-gray-50 flex justify-between cursor-pointer items-center px-4 py-3 text-left hover:bg-gray-100 rounded-t-md"
      >
        <p className="font-semibold text-md text-gray-800">{header}</p>
        {open ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
      </button>
      {open && (
        <div className="px-4 py-3 text-sm text-gray-700 bg-white rounded-b-md">
          {description ? description : "No description provided."}
        </div>
      )}
    </div>
  );
}

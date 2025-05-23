'use client'

import { useContext } from "react";
import { UsageContext } from "../context/usageContext";
import { Star } from "lucide-react";


export default function UsageComponent() {

      const { usage, usageLoading } = useContext(UsageContext);

      if (usageLoading) return <p>Loading...</p>;

    
    return(
        <>
            <div className="flex items-center gap-1 rounded-md bg-yellow-100 text-yellow-800 px-3 py-1 text-sm font-medium select-none shadow-sm">
      <Star className="w-5 h-5" />
      <span>{usage} credits</span>
    </div>
        </>
    )
}
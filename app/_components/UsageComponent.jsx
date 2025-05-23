'use client'

import { useContext } from "react";
import { UsageContext } from "../context/usageContext";


export default function UsageComponent() {

      const { usage, usageLoading } = useContext(UsageContext);

      if (usageLoading) return <p>Loading...</p>;

    
    return(
        <>
            {usage}
        </>
    )
}
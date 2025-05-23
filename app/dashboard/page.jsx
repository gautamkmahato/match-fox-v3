'use client'

import { useEffect } from "react";
import PdfTextExtractor from "./interview/_components/PdfTextExtractor";
import CameraComponent from "./meetings/_components/CameraComponent";

export default function page() {

    useEffect(() => {
  const jobText = localStorage.getItem("job_description");
  if (jobText) {
    console.log("Received job description:", jobText);
    // You can now send it to your backend, show it in UI, generate questions, etc.
  }
}, []);


    return(
        <>
            <h1>Dashboard Page</h1>
            
        </>
    )    
}
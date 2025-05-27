'use client'

import fetchResumes from "@/app/service/resume/fetchResumes";
import LoadingOverlay from "@/components/LoadingOverlay";
import Modal from "@/components/Modal";
import { formatDate } from "@/lib/utils/helper";
import { Briefcase, Building2, FileText, RepeatIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner";

export default function AllResume() {

    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModalIndex, setOpenModalIndex] = useState(null);
    

    const resumeRef = useRef(null);
    
    const getResumes = async () =>{
        try{
            setLoading(true);
            const result = await fetchResumes();
            if(result?.state){
                console.log("Failed to fetch resumes");
                toast("Failed to fetch resumes");
            }
            console.log(result);
            setResumes(result?.data);
        } catch(error){
            console.log("Something went wrong: ", error);
            toast(`Error: ${error}`);
        } finally{
            setLoading(false);
        }
    }
    useEffect(() =>{
        getResumes();
    }, []);


    if(loading){
        return(
            <>
                <LoadingOverlay text="Loading Resumes..." />
            </>
        )
    }
  
    return (
        <>
        <div>
            <div className='border-b border-gray-100 shadow shadow-gray-50 pt-8'>
          <h1 className="flex items-center gap-2 w-full max-w-4xl mx-auto text-2xl font-bold text-gray-900 mb-6">
            <FileText className="text-gray-800" />
            All Resumes
          </h1>
        </div>
      <div className="w-full max-w-4xl mx-auto pt-4">
      {/* Resume List */}
      {resumes && resumes.length > 0 ? (
        resumes.map((resume, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-5 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-200 mb-4"
          >
            {/* Resume Info */}
            <div className="flex items-start gap-4">
              <div className="flex flex-col gap-1">
                {/* File Info Tags */}
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  {/* file_name as link */}
                  <button
                    onClick={() => setOpenModalIndex(index)}
                    className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-indigo-700 hover:underline"
                  >
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    {resume?.file_name}
                  </button>

                  {/* file_type */}
                  <span className="flex items-center gap-1 bg-gray-100 border border-gray-200 rounded-full px-3 py-1 text-xs font-medium">
                    <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                    {resume?.file_type}
                  </span>
                </div>

                {/* Upload Date */}
                <p className="text-xs text-gray-500 mt-1">
                  Uploaded on:{" "}
                  <span className="font-medium text-gray-700">
                    {formatDate(resume?.uploaded_at)}
                  </span>
                </p>
              </div>
            </div>

            {/* Modal for each resume */}
{openModalIndex === index && (
  <Modal
    isOpen={openModalIndex === index}
    onClose={() => setOpenModalIndex(null)}
    title="Resume Preview"
    width="max-w-4xl"
  >
    <div className="bg-gray-50 p-4 sm:p-8 flex flex-col items-center">
      <iframe
        srcDoc={resume?.html_content}
        className="w-full max-w-4xl bg-white shadow-lg rounded-md"
        style={{
          height: "80vh",           // make it responsive
          overflowY: "auto",        // allow vertical scroll
          border: "none",
        }}
      />
    </div>
  </Modal>
)}

          </div>
        ))
      ) : (
        <div className="text-sm text-gray-500">No resumes uploaded yet.</div>
      )}
      </div>
        </div>
    </>
    )
};



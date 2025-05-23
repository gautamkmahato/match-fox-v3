// app/interview/new/page.js

import { SquaresIntersect } from "lucide-react";
import CreateInterviewForm from "../_components/CreateInterviewForm";
import ContactForm from "@/app/_components/(sample)/Form";



export default function CreateInterviewPage() {
  return (
    <main className="max-w-4xl mx-auto p-6">
        <h1 className="flex gap-1 items-center text-2xl font-bold text-[#1D1D1F] mb-1">
          <SquaresIntersect className="h-5 w-5" />
        Create Interview
      </h1>
      <p className="text-sm text-gray-400 mb-8">
        Please fill in the details below to generate customize mock interview
      </p>
      <CreateInterviewForm />
      {/* <ContactForm /> */}
    </main>
  );
}
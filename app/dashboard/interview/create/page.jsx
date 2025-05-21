// app/interview/new/page.js

import CreateInterviewForm from "../_components/CreateInterviewForm";



export default function CreateInterviewPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl font-bold mb-4">Create New Interview</h1>
      <CreateInterviewForm />
    </main>
  );
}
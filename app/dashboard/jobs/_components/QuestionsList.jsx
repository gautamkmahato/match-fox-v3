
import { toast } from "sonner";

export default function QuestionsList({ questions }) {

    if(!questions){
        console.log("No Questions available");
        return;
    }

    return(
        <>
            <div>
                <div>
                    {Object.entries(questions).map(([key, value]) =>(
                        <div key={key} className="bg-white p-4 border border-gray-200 rounded-lg shadow mb-2">
                            <label className="block font-semibold text-gray-800">{key}</label>
                            <p className="mt-1 text-gray-600 text-sm">{value || "No answer provided."}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
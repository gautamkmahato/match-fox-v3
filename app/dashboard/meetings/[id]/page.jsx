import InterviewPage from "../_components/InterviewPage";


export default async function page({ params }) {

    const param = await params;
    const interviewId = param.id;

    return (
        <>
            <div className="bg-gray-50">
                <InterviewPage interviewId={interviewId} />
            </div>
        </>
    );
}

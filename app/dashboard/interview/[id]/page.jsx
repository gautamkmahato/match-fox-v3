import InterviewDetails from "../_components/InterviewDetails";


export default async function page({ params }) {

    const param = await params;
    const interviewId = param.id;

    console.log(interviewId)

    return(
        <>
            <InterviewDetails interviewId={interviewId} />
        </>
    )
}
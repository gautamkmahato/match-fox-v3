import JobDetails from "./_components/JobDetails";


export default async function page({ params }) {

    const param = await params;
    const interviewId = param.id;

    console.log(interviewId)

    return(
        <>
            <JobDetails interviewId={interviewId} />
        </>
    )
}
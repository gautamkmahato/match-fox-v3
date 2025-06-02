import InterviewCard from "./InterviewCard";


export default function InprogressInterviewsList({ inProgressInterviews }) {
    return (
        <>
            <div className="bg-white px-4 py-8 rounded-xl shadow-md mt-6">
                <h3 className="font-semibold text-lg text-gray-800">In Progress Interviews</h3>
                {inProgressInterviews && inProgressInterviews?.length > 0 ? 
                    <div className="flex flex-wrap justify-center sm:justify-start gap-6 mt-6">
                    {inProgressInterviews.map((interview) => (
                        <div
                            key={interview.id}
                            className="w-full sm:w-[90%] md:w-[70%] lg:w-[47%] xl:w-[47%] max-w-[500px]"
                        >
                            <InterviewCard
                                id={interview.id}
                                name={interview.interview_name}
                                duration={Math.floor(interview.duration/60)}
                                logo={interview.company_logo}
                                date={interview.created_date}
                                status={interview.status}
                                position={interview.position}
                                type={interview.interview_type}
                            />
                        </div>
                    ))}
                </div> :
                <div className='flex items-center justify-center'>
                            <h3 className='text-semibold text-sm text-gray-600'>No Inprogrss Interview</h3>
                        </div>
                }
                
            </div>
        </>
    )
}
import FilterSectionHeader from "./FilterSectionHeader";
import InterviewCard from "./InterviewCard";


export default function AllInteviewsList({ interviews }) {
    return (
        <>
            <div className="bg-white p-4 rounded-xl shadow-md">
                <FilterSectionHeader />

                <div className="flex flex-wrap justify-center sm:justify-start gap-6 mt-6">
                    {interviews.map((interview) => (
                        <div
                            key={interview.id}
                            className="w-full sm:w-[90%] md:w-[70%] lg:w-[47%] xl:w-[47%] max-w-[500px]"
                        > 
                            <InterviewCard
                                id={interview.id}
                                name={interview.interview_name}
                                company={interview.company}
                                duration={Math.floor(interview.duration/60)}
                                logo={interview.company_logo}
                                date={interview.created_date}
                                status={interview.status}
                                position={interview.position}
                                type={interview.interview_type}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
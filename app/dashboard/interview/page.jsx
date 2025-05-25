'use client';

import { useEffect, useState } from 'react';
import CreateInterview from './_components/CreateInterview';
import InprogressInterviewsList from './_components/InprogressInterviewsList';
import AllInteviewsList from './_components/AllInteviewsList';
import fetchAllInterviews from '@/app/service/interview/fetchAllInterviews';
import LoadingOverlay from '@/components/LoadingOverlay';
import EmptyStateComponent from '@/app/_components/EmptyStateComponent';



export default function InterviewDashboardPage() {
    const [interviews, setInterviews] = useState([]);
    const [inProgressInterviews, setInProgressInterviews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchInterviews = async () => {
            const result = await fetchAllInterviews();

            if (!isMounted) return;

            if (!result?.state) {
                console.error('Error fetching interviews:', error);
                setError(error);
            } else {
                setInterviews(result?.data);
                const inprogressList = result?.data.filter((interview) => interview?.status === 'open')
                setInProgressInterviews(inprogressList)
                setError(null);
            }

            setLoading(false);
        };

        fetchInterviews();

        return () => {
            isMounted = false;
        };
    }, []);

    const renderHeader = () => (
        <div>
            <h1 className="text-xl font-semibold text-gray-800 mb-4">Dashboard</h1>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <CreateInterview
                    header="Create New Interview"
                    paragraph="Initiate a new AI-driven interview session tailored to your requirements."
                    iconType="mic"
                />
                <CreateInterview
                    header="Create Phone Screening"
                    paragraph="Set up an AI-powered phone screening to assess candidates efficiently."
                    iconType="phone"
                />
            </div>
        </div>
    );

    const renderInterviews = () => {
        if (loading) {
            return (
                <>
                    <LoadingOverlay text="Loading Interviews" />
                </>
            )
        }

        if (error) {
            return (
                <>
                    {toast.error(`Error: ${error}`)}
                </>
            )
        }

        if (interviews.length === 0) {
            return (
                <>
                    <EmptyStateComponent icon="not-found"
                        title="No Interviews available"
                        description="We couldn’t find any interviews." />
                </>
            )
        }

        return (
            <>
                {/* New Open Interviews */}
                <InprogressInterviewsList inProgressInterviews={inProgressInterviews} /> :


                {/* All Interviews */}
                <AllInteviewsList interviews={interviews} />
            </>
        );
    };

    return (
        <main className="min-h-screen p-6 md:p-8 bg-gray-100" style={{ fontFamily: 'var(--font-roboto)' }}>
            <div className="space-y-6">
                {renderHeader()}
                {renderInterviews()}
            </div>
        </main>
    );
}

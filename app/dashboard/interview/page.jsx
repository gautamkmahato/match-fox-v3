'use client';

import { useEffect, useState } from 'react';
import InterviewCategory from './_components/InterviewCategory';



export default function InterviewDashboardPage() {
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    return (
        <main className="min-h-screen p-6 md:p-8 bg-gray-100" style={{ fontFamily: 'var(--font-roboto)' }}>
            <InterviewCategory />
        </main>
    );
}

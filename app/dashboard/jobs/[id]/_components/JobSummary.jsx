'use client'

import { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  DollarSign,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  Dock,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import CandidateHeader from '@/app/dashboard/user/_components/CandidateHeader';
import ProfileNavigation from '@/app/dashboard/user/_components/ProfileNavigation';
import InfoRow from '@/app/dashboard/user/_components/InfoRow';
import Card from '@/app/dashboard/user/_components/Card';
import CompanyLogo from '@/app/dashboard/report/_components/CompanyLogo';
import fetchUserResume from '@/app/service/resume/fetchUserResume';

export default function JobSummary({ 
  userData, 
  resumeData, 
  setResumeData, 
  loadingResume, 
  setLoadingResume 
}) {
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getResume = async () => {
    try {
      setLoadingResume(true);
      const result = await fetchUserResume();
      
      if (!result?.state) {
        console.log("Unable to fetch Resume");
        toast.error("Unable to fetch Resume");
        return;
      }
      
      setResumeData(result?.data);
    } catch (error) {
      console.log("Fetch Error: ", error);
      toast.error(`Fetch Error: ${error.message}`);
    } finally {
      setLoadingResume(false);
    }
  };

  useEffect(() => {
    if (!resumeData && !loadingResume) {
      getResume();
    }
  }, []);

  return (
    <div className='p-4 md:p-8'>
      <div className="grid grid-cols-1 gap-6">
        {/* Candidate Details */}
        <div className="col-span-1">
          <CandidateHeader 
            name={userData?.name || ''} 
            title={userData?.designation || ''} 
            age={userData?.personal_info?.age || ''} 
            image={userData?.img_url || ''} 
            text="text-lg" 
            social_accounts={userData?.social_accounts} 
          />
          
          <ProfileNavigation 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />

          {activeTab === 'Overview' && (
            <>
              {/* Personal Information */}
              <Card title="Personal Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <InfoRow icon={<Mail />} label="Email Address" value={userData?.personal_info?.email || 'Not provided'} />
                  <InfoRow icon={<Phone />} label="Phone Number" value={userData?.personal_info?.phone || 'Not provided'} />
                  <InfoRow icon={<DollarSign />} label="Salary Expectation" value={userData?.personal_info?.salary_expectation || 'Not specified'} />
                  <InfoRow icon={<Calendar />} label="Age" value={userData?.personal_info?.age || 'Not specified'} />
                  <InfoRow icon={<MapPin />} label="Location" value={userData?.personal_info?.location || 'Not specified'} />
                  <InfoRow icon={<Briefcase />} label="Work Type" value={userData?.work_type || 'Not specified'} />
                </div>
              </Card>

              {/* Resume */}
              <Card title="Resume">
                {loadingResume ? (
                  <p className="text-gray-500">Loading resume...</p>
                ) : resumeData?.length > 0 ? (
                  resumeData.map((data, index) => (
                    <div key={index} className='flex flex-col md:flex-row items-start md:items-center justify-between gap-2 py-2'>
                      <div className="flex items-center gap-2">
                        <Dock className='w-5 h-5 text-gray-500' />
                        <span className="text-gray-700 break-words">{data?.file_name}</span>
                      </div>
                      <Link 
                        href={data?.file_url} 
                        target='_blank' 
                        className="flex items-center text-sm px-3 py-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                      >
                        <Download className="w-4 h-4 mr-1.5" />
                        Download
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No resume available</p>
                )}
              </Card>

              {/* Experience */}
              <Card title="Work Experience">
                {userData?.experience ? (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <CompanyLogo 
                        logo={`https://logo.clearbit.com/${userData.experience.company_name || 'example'}.com`} 
                        company={userData.experience.company_name?.charAt(0).toUpperCase() || '?'} 
                        width="w-10" 
                        height="h-10" 
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {userData.experience.company_name || 'Unknown company'}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mt-1">
                          <span>{userData.experience.position || 'Unknown position'}</span>
                          {userData.experience.year && (
                            <>
                              <span>•</span>
                              <span>{userData.experience.year}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No work experience added</p>
                )}
              </Card>

              {/* Projects */}
              <Card title="Projects">
                <p className="text-gray-500">No projects added yet.</p>
              </Card>

              {/* Education */}
              <Card title="Education">
                <p className="text-gray-500">No education information added yet.</p>
              </Card>
            </>
          )}

          {activeTab === 'Notes' && (
            <Card title="Notes">
              <p className="text-gray-500">No notes available.</p>
            </Card>
          )}

          {activeTab === 'Tests' && (
            <Card title="Assessment Tests">
              <p className="text-gray-500">No test results available.</p>
            </Card>
          )}

          {activeTab === 'Rotary' && (
            <Card title="Rotary Information">
              <p className="text-gray-500">No rotary information available.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

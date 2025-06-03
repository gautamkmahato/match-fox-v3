'use client'


import { useEffect, useState } from 'react';
import Layout from './_components/Layout';
import ProfileNavigation from './_components/ProfileNavigation';
import Card from './_components/Card';
import InfoRow from './_components/InfoRow';
import {
  Mail,
  Phone,
  DollarSign,
  Calendar,
  MapPin,
  Briefcase,
  Download,
  ExternalLink,
  ChevronDown,
  Pencil,
  Plus,
  Dock,
  ChevronRight,
} from 'lucide-react';
import CandidateHeader from './_components/CandidateHeader';
import fetchUserDetails from '@/app/service/user/fetchUserDetails';
import { toast } from 'sonner';
import fetchResumes from '@/app/service/resume/fetchResumes';
import fetchUserResume from '@/app/service/resume/fetchUserResume';
import Link from 'next/link';
import CompanyLogo from '../report/_components/CompanyLogo';
import fetchUserAttemptDetails from '@/app/service/interview/fetchUserAttemptDetails';

export default function CandidateProfile() {
    const [userData, setUserData] = useState();
    const [resume, setResume] = useState();
    const [interviewAttemptDetails, setInterviewAttemptDetails] = useState();
    const [activeTab, setActiveTab] = useState('Overview');
    const [loading, setLoading] = useState(false);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getUser = async () =>{
    try{
        const result = await fetchUserDetails();
        // console.log(result);
        if(!result?.state){
            // console.log("Failed to fetch user data");
            toast.error("Failed to fetch user data");
            return;
        }
        // console.log(result?.data);
        setUserData(result?.data);
    } catch(error){
        // console.log("Fetch Error: ", error);
        toast.error("Fetch Error: ", error);
    } finally{
        // console.log("User data fetched successfully")
    }
  }

  const getResume = async () =>{
    try{
        const result = await fetchUserResume();

        if(!result.state){
            // console.log("Unable to fetch Resume");
            toast.error("Unable to fetch Resume");
            return;
        }
        // console.log("Resume", result?.data);
        setResume(result?.data);
    } catch(error){
        // console.log("Fetch Error: ", error);
        toast.error("Fetch Error: ", error);
    } finally{
        // console.log("Succssfully fetch resume")
    }
  }


    const getInterviewAttempt = async () => {
  try {
    const result = await fetchUserAttemptDetails();

    if (!result.state) {
      // console.log("Unable to fetch interview attempt details");
      toast.error("Unable to fetch interview attempt details");
      return;
    }

    const limitedResults = result?.data?.slice(0, 3); // 👈 show only top 3
    // console.log("interview attempt details", limitedResults);

    setInterviewAttemptDetails(limitedResults);
  } catch (error) {
    // console.log("Fetch Error: ", error);
    toast.error("Fetch Error: ", error);
  } finally {
    // console.log("Successfully fetched interview attempt details");
  }
    };



  useEffect(() =>{
    try{
        setLoading(true);
        getUser();
        getResume();
        getInterviewAttempt();
    } catch(error){
        console.log("Error: ", error);
        toast.error("Error: ", error);
    } finally{
        setLoading(false);
        console.log("Success");
        toast("Successfully fetched data");
    }
  }, []);

  if(loading){
    return(
        <>
            <h1>Loading...</h1>
        </>
    )
  }


  return (
    <>
      <div className='p-8'> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Candidate Details */}
        <div className="md:col-span-2">
          <CandidateHeader name={userData?.name || ''} title={userData?.designation || ''} age={userData?.personal_info?.age || ''} image={userData?.img_url || ''} text="text-lg" social_accounts={userData?.social_accounts} />
          <ProfileNavigation activeTab={activeTab} onTabChange={handleTabChange} />

          {activeTab === 'Overview' && (
            <>
              {/* All Personal Informations */}
              <Card title="All Personal Informations">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                    <InfoRow icon={<Mail />} label="Email Address" value={userData?.personal_info?.email || ''} />
                    <InfoRow icon={<Phone />} label="Phone Number" value={userData?.personal_info?.phone || ''} />
                    <InfoRow icon={<DollarSign />} label="Salary Expectation" value={userData?.personal_info?.salary_expectation || ''} />
                    <InfoRow icon={<Calendar />} label="Age" value={userData?.personal_info?.age || ''} />
                    <InfoRow icon={<MapPin />} label="Location" value={userData?.personal_info?.location || ''} />
                    <InfoRow icon={<Briefcase />} label="Work Type" value={userData?.work_type} />
                </div>
              </Card>

              {/* Resume */}
              <Card title="Resume">
                <div className="">
                    {resume && resume?.length > 0 && resume.map((data, index) =>(
                        <div key={index} className='flex items-center justify-between'>
                            <p className="flex items-center gap-2 text-md text-dark-gray-text">
                                <Dock className='w-6 h-6' />
                                {data?.file_name}
                            </p>
                            <Link href={data?.file_url} target='_blank' className="flex items-center text-sm px-4 py-2 bg-primary-purple text-white rounded-md bg-indigo-700 hover:bg-indigo-900 transition">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                            </Link>
                        </div>
                    ))}
                </div>
              </Card>

              {/* All Experiences */}
              <Card title="All Experiences">
                <div className="space-y-4">
                  {/* Experience Item 1 */}
                  <div className="flex items-start">
                    <CompanyLogo 
                        logo={`https://logo.clearbit.com/${userData?.experience?.company_name || 'google'}.com`} 
                        company={userData?.experience?.company_name?.charAt(0).toUpperCase()} 
                        width="w-12" height="w-12" 
                        className="mr-2" 
                    />

                    <div>
                      <p className="text-md font-semibold text-gray-700">{userData?.experience?.company_name || ''}</p>
                      <div className='flex items-center gap-2'>
                        <p className="text-xs text-gray-500 font-semibold">{userData?.experience?.position || ''}</p> {`-`}
                        <p className="text-xs text-gray-400">{userData?.experience?.year || ''}</p>
                      </div>
                    </div>
                  </div>
                  {/* Add more experience items as needed */}
                </div>
              </Card>

              {/* All Projects */}
              <Card title="All Projects">
                <p className="text-gray-600">No projects added yet.</p>
                {/* Example if there were projects */}
                {/* <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-md font-semibold text-dark-gray-text">Project Alpha</p>
                      <p className="text-sm text-light-gray-text">Description of Project Alpha.</p>
                    </div>
                    <a href="#" className="text-primary-purple flex items-center text-sm">
                      View <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div> */}
              </Card>

              {/* All Educations */}
              <Card title="All Educations">
                <p className="text-light-gray-text">No education added yet.</p>
                {/* Example if there were educations */}
                {/* <div className="space-y-4">
                  <div className="flex items-start">
                    <img
                      src="/university-logo.png" // Placeholder logo
                      alt="University Logo"
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-md font-semibold text-dark-gray-text">Bogazici University</p>
                      <p className="text-sm text-light-gray-text">Bachelor of Computer Science</p>
                      <p className="text-xs text-gray-400">Sep 2018 - Jun 2022</p>
                    </div>
                  </div>
                </div> */}
              </Card>
            </>
          )}

          {/* You would render different content based on activeTab */}
          {activeTab === 'Notes' && <Card title="Notes"><p>Content for Notes tab.</p></Card>}
          {activeTab === 'Tests' && <Card title="Tests"><p>Content for Tests tab.</p></Card>}
          {activeTab === 'Rotary' && <Card title="Rotary"><p>Content for Rotary tab.</p></Card>}
        </div>

        {/* Right Column - Active Positions & Personal Information (duplication from image) */}
        <div className="md:col-span-1">

          {/* Active Positions */}
          <Card title="Recently Applied">
            <div className="space-y-4">
              {/* Position 1 */}
              {interviewAttemptDetails && interviewAttemptDetails.length > 0 && interviewAttemptDetails.map((details, index) =>(
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-50 shadow-sm">
                    <div className="flex items-center">
                        <CompanyLogo 
                            logo={`https://logo.clearbit.com/${details?.interviews?.company_logo || 'google'}.com`} 
                            company={details?.interviews?.company?.charAt(0).toUpperCase()} 
                            width="w-8" height="h-8" 
                            className="mr-1"
                            text='text-md' 
                        />
                    <div>
                        <p className="font-semibold text-gray-700 text-xs">{details?.interviews?.interview_name}</p>
                        <p className="text-sm text-gray-600">{details?.interviews?.company}</p>
                    </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold text-orange-600 bg-orange-100 rounded-full">
                    {details?.status}
                    </span>
                </div>
              ))}
              
              {/** Button */}
              <Link href="/dashboard/report" className="w-full mt-4 py-2 bg-primary-purple text-sm text-white rounded-md bg-indigo-700 hover:bg-indigo-900 transition flex items-center justify-center cursor-pointer">
                Show All <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </Card>

          {/* Career Status */}
          <Card title="Career Status">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">{userData?.career_status || ''}</p>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </Card>

          {/* Personal Informations (again, as per image) */}
          <Card title="Personal Informations">
            <InfoRow icon={<Phone />} label="Turkey Number" value="+91 (545) 493 00 00" />
            <InfoRow icon={<Mail />} label="Mail Address" value="gautam.mahato@gmail.com" />
          </Card>

          {/* Resume (again, as per image) */}
          <Card title="Resume">
            <div className="flex items-center justify-between py-2">
              <p className="text-md text-dark-gray-text">jerome-bell-resume.pdf</p>
              {/* Download button from the original image for consistency */}
              <button className="flex items-center px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-purple-700 transition">
                <Download className="w-4 h-4 mr-2" />
                Download
              </button>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </>
  );
}
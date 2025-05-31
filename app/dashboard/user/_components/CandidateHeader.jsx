// components/CandidateHeader.tsx
import React from 'react';
import { ArrowLeft, Edit, Github, Linkedin, Pencil, Twitter } from 'lucide-react';
import CompanyLogo from '../../report/_components/CompanyLogo';
import Link from 'next/link';


const CandidateHeader = ({ name, title, age, image, social_accounts }) => {
  return (
    <div className="bg-white py-8 flex justify-between items-center border-t border-gray-100 shadow-sm rounded-t-xl">
      <div className="">
        <div className="flex items-center ml-8">
            {/* <img 
              src={image} // Replace with actual image source or a placeholder
              alt={name}
              className="w-16 h-16 rounded-full mr-4 object-cover"
            /> */}
            <CompanyLogo logo={image} company={name?.charAt(0).toUpperCase()} width="w-16" height="w-16" className="mr-4 w-16 h-16" />
            <div>
              <h1 className="text-2xl font-bold text-dark-gray-text">
                {name} <span className="text-gray-400 font-normal text-sm">({age})</span>
              </h1>
              <p className="text-gray-600">{title}</p>
            </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 px-8">
          <Link href={social_accounts?.linkedin || ''} className="flex items-center text-xs px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-blue-700 transition">
            <Linkedin className="w-3 h-3 mr-1" />
            Linkedin
          </Link>
          <Link href={social_accounts?.github || ''} className="flex items-center text-xs px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-blue-700 transition">
            <Github className="w-3 h-3 mr-1" />
            Github
          </Link>
          <Link href={social_accounts?.twitter || ''} className="flex items-center text-xs px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-blue-700 transition">
            <Twitter className="w-3 h-3 mr-1" />
            Twitter
          </Link>
        </div>
      </div>
      <div className="flex items-center space-x-4 mt-4 px-8">
        <Link href='/dashboard/user/update' className="flex items-center text-xs px-3 py-3 bg-indigo-700 text-white rounded-full hover:bg-blue-700 transition">
          <Edit className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

export default CandidateHeader;
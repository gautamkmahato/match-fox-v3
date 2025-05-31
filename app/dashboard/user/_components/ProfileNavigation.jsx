// components/ProfileNavigation.tsx
import React from 'react';


const ProfileNavigation = ({ activeTab, onTabChange }) => {
  const tabs = ['Overview', 'Notes', 'Tests', 'Rotary'];

  return (
    <div className="bg-white flex border-b border-b-gray-100 shadow-sm rounded-b-xl mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === tab
              ? 'text-primary-purple border-b-2 border-primary-purple'
              : 'text-light-gray-text hover:text-dark-gray-text'
          } transition-colors duration-200`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ProfileNavigation;
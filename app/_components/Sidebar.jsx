'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  Menu, X, Home, Settings, Logs, LayoutDashboard, Book, Group, Star, Diamond,
  CreditCard, ChevronDown, ChevronRight, FileText, Mic, UserRound, Terminal,
  ClipboardList, FileSignature, Video,
  Plus,
  BriefcaseBusiness,
  Briefcase,
  Salad,
  Sailboat,
  Notebook
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import matchfox from '../../public/match-fox-5.jpg'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const pathname = usePathname()

  const toggleSidebar = () => setIsOpen(!isOpen)
  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(prev => (prev === dropdownName ? null : dropdownName))
  }

  return (
    <div className="bg-white text-white min-h-screen">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 z-30 flex items-center justify-between px-4 h-14 border-b border-gray-700">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-gray-400" />
        </button>
        <div className="text-lg font-semibold">MatchFox</div>
        <div className="w-6" />
      </div>

      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`bg-white border-r border-zinc-100 shadow w-3/4 transform transition-transform duration-300 md:w-60
          ${isOpen ? 'fixed top-0 left-0 z-40 h-screen' : 'fixed top-0 left-0 z-40 h-screen -translate-x-full'}
          md:translate-x-0 md:sticky md:top-0 md:h-screen md:shadow-none shadow-md`}
        style={{ fontFamily: "var(--font-roboto)" }}
      >
        <div className="md:hidden flex justify-end p-4">
          <button onClick={toggleSidebar}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <nav className="space-y-2 px-4 pb-32">
          {/* Logo */}
          <Link
            href="/"
            className="hidden md:flex items-center mt-1.5 pb-6 space-x-2 p-2 rounded"
          >
            <Image src={matchfox} width={24} height={24} alt='logo' className="w-7 h-7 rounded-md" />
            <span className='font-bold text-lg text-indigo-900'>Hirenom</span>
          </Link>

          {/* Nav Items */}
          <Link
            href="/dashboard"
            className={`flex items-center text-sm space-x-2 p-2 rounded 
              ${pathname === '/dashboard' ? 'bg-gray-400 text-white' : 'text-zinc-800 hover:bg-zinc-200'}`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/dashboard/interview"
            className={`flex items-center text-sm space-x-2 p-2 rounded 
              ${pathname === '/dashboard/interview' ? 'bg-gray-400 text-white' : 'text-zinc-800 hover:bg-zinc-200'}`}
          >
            <Video className="w-4 h-4" />
            <span>Interviews</span>
          </Link>

          <Link
            href="/dashboard/jobs"
            className={`flex items-center text-sm space-x-2 p-2 rounded 
              ${pathname === '/dashboard/jobs' ? 'bg-gray-400 text-white' : 'text-zinc-800 hover:bg-zinc-200'}`}
          >
            <Notebook className="w-4 h-4" />
            <span>Jobs Post</span>
          </Link>

          {/* Resume Dropdown */}
          <div className="text-sm text-gray-700">
            <button
              onClick={() => handleDropdownToggle('resume')}
              className="flex items-center cursor-pointer justify-between w-full space-x-2 p-2 hover:bg-zinc-200 rounded"
            >
              <div className='flex space-x-2 items-center'>
                <FileSignature className="w-4 h-4 text-zinc-800" />
                <span>Resume</span>
              </div>
              {openDropdown === 'resume' ? (
                <ChevronDown className="w-4 h-4 text-gray-700" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-700" />
              )}
            </button>
            {openDropdown === 'resume' && (
              <div className="px-2 flex flex-col space-y-1 mt-1">
                <Link
                  href="/dashboard/resume/create"
                  className={`flex gap-1 items-center px-2.5 py-1.5 rounded-lg
                    ${pathname === '/dashboard/resume/create' ? 'bg-gray-400 text-white' : 'text-zinc-700 hover:bg-gray-100'}`}
                >
                  <Plus className='w-4 h-4' />
                  Create Resume
                </Link>
                <Link
                  href="/dashboard/resume"
                  className={`flex gap-1 items-center px-2.5 py-1.5 rounded-lg
                    ${pathname === '/dashboard/resume' ? 'bg-gray-400 text-white' : 'text-zinc-700 hover:bg-gray-100'}`}
                >
                  <Briefcase className='w-4 h-4'  />
                  All Resume
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/dashboard/report"
            className={`flex items-center text-sm space-x-2 p-2 rounded 
              ${pathname === '/dashboard/report' ? 'bg-gray-400 text-white' : 'text-zinc-800 hover:bg-zinc-200'}`}
          >
            <FileText className="w-4 h-4" />
            <span>Reports</span>
          </Link>

          <Link
            href="/payment"
            className={`flex items-center text-sm space-x-2 p-2 rounded 
              ${pathname === '/payment' ? 'bg-gray-400 text-white' : 'text-zinc-800 hover:bg-zinc-200'}`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Billing</span>
          </Link>

          <Link
            href="/"
            className={`flex items-center text-sm space-x-2 p-2 rounded 
              ${pathname === '/' ? 'bg-gray-400 text-white' : 'text-zinc-800 hover:bg-zinc-200'}`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>

          {/* Upgrade Plan Section */}
          <div className="absolute bottom-4 left-0 w-full px-4">
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-500 text-white rounded-xl p-4 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Diamond className="w-5 h-5 text-white" />
                <div>
                  <p className="text-sm font-semibold">Upgrade Your Plan</p>
                  <p className="text-xs text-white/80">Unlock premium interview features</p>
                </div>
              </div>
              <Link
                href="/payment"
                className="block text-center bg-white text-indigo-600 font-semibold text-sm py-2 rounded-md hover:bg-zinc-200 transition"
              >
                Pay Now
              </Link>
            </div>
          </div>
        </nav>
      </div>

      {/* Spacer for mobile header */}
      <div className="h-14 md:hidden" />
    </div>
  )
}

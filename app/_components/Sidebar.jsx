'use client'

import { useState } from 'react'
import { Menu, X, Home, Settings, Logs, LayoutDashboard, Book, Group, Star, Diamond } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import matchfox from '../../public/matchfox-logo.png'


export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => setIsOpen(!isOpen)

    return (
        <div className="bg-white text-white min-h-screen">
            {/* Mobile top bar */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-gray-800 z-30 flex items-center justify-between px-4 h-14 border-b border-gray-700">
                <button onClick={toggleSidebar}>
                    <Menu className="w-6 h-6 text-gray-400" />
                </button>
                <div className="text-lg font-semibold">MatchFox</div>
                <div className="w-6" /> {/* Placeholder to balance layout */}
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
                className={`bg-white border-r border-zinc-100 shadow w-3/4 transform transition-transform duration-300 md:w-64
                    ${isOpen ? 'fixed top-0 left-0 z-40 h-screen' : 'fixed top-0 left-0 z-40 h-screen -translate-x-full'}
                    md:translate-x-0 md:sticky md:top-0 md:h-screen md:shadow-none shadow-md`}
                    
                    style={{ fontFamily: "var(--font-roboto)" }}
            >
                {/* Close button for mobile */}
                <div className="md:hidden flex justify-end p-4">
                    <button onClick={toggleSidebar}>
                        <X className="w-6 h-6 text-gray-400" />
                    </button>
                </div>

                <nav className="space-y-2 px-4">
                    {/* Logo - hidden on mobile, shown on md+ */}
                    <Link
                        href="/"
                        className="hidden md:flex items-center mt-1.5 pb-6 space-x-2 p-2 rounded"
                    >
                        <Image src={matchfox} width="24" height="24" alt='logo' className="w-7 h-7 text-blue-500" />
                        <span className='font-bold text-lg text-gray-700'>MatchFox</span>
                    </Link>

                    {/* Other Nav Items */}
                    <Link
                        href="/"
                        className="flex items-center text-sm text-zinc-800 space-x-2 p-2 hover:bg-zinc-200 rounded"
                    >
                        <Home className="w-5 h-5 text-zinc-800" />
                        <span>Home</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className="flex items-center text-sm text-zinc-800 space-x-2 p-2 hover:bg-zinc-200 rounded"
                    >
                        <LayoutDashboard className="w-5 h-5 text-zinc-800" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/dashboard/interview"
                        className="flex items-center text-sm text-zinc-800 space-x-2 p-2 hover:bg-zinc-200 rounded"
                    >
                        <Book className="w-5 h-5 text-zinc-800" />
                        <span>Jobs</span>
                    </Link>
                    <Link
                        href="/dashboard/report"
                        className="flex items-center text-sm text-zinc-800 space-x-2 p-2 hover:bg-zinc-200 rounded"
                    >
                        <Group className="w-5 h-5 text-zinc-800" />
                        <span>Reports</span>
                    </Link>
                    <Link
                        href="/settings"
                        className="flex items-center text-sm text-zinc-800 space-x-2 p-2 hover:bg-zinc-200 rounded"
                    >
                        <Settings className="w-5 h-5 text-zinc-800" />
                        <span>Settings</span>
                    </Link>
                    {/* Clerk Auth Buttons - mobile only, fixed at bottom */}
                    {/* <div className="absolute bottom-4 w-full px-4 mr-[-10px] md:hidden">
                        <div className="flex justify-between">
                            <SignedOut>
                                <div className="flex space-x-2">
                                    <SignInButton className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-2 text-sm" />
                                    <SignUpButton className="bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-2 text-sm" />
                                </div>
                            </SignedOut>
                            <SignedIn>
                                <div className='flex gap-2 w-full items-center'>
                                    <UserButton />
                                    <div>
                                        <p className="text-sm">
                                            <strong className="text-gray-600 font-medium">Eric Frusciante</strong>
                                            <span className="text-gray-400 block"> eric@frusciante.com </span>
                                        </p>
                                    </div>
                                </div>
                            </SignedIn>
                        </div>
                    </div> */}
                </nav>
            </div>

            {/* Spacer for mobile header */}
            <div className="h-14 md:hidden" />
        </div>
    )
}
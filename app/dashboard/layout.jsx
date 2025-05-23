

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { currentUser } from '@clerk/nextjs/server';
import Sidebar from "../_components/Sidebar";
import UsageComponent from "../_components/UsageComponent";
import { UsageContextProvider } from "../context/usageContext";




export default async function RootLayout({ children }) {


  const user = await currentUser();


  return (
    <UsageContextProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar stays fixed/sticky on left */}
        <Sidebar />

        {/* Main content scrolls independently */}
        <main className="flex-1 overflow-y-auto">
          <header className="hidden md:flex sticky top-0 z-50 bg-white border-b border-zinc-100 px-6 py-2 h-14 items-center justify-between">
            {/* Left: User Name */}
            <div>
              <h1 className="font-semibold text-gray-700">Welcome, {user?.firstName}</h1>
            </div>

            {/* Right: Icons and Auth Buttons */}
            <div className="flex gap-4 items-center">
              <UsageComponent />
              <Bell className="w-5 h-5 text-gray-600" />

              <SignedOut>
                <SignInButton />
                <SignUpButton />
              </SignedOut>

              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>

          {children}
        </main>
      </div>
    </UsageContextProvider>
  );
}

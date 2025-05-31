"use client";

import { Linkedin, Phone, Mail, FileText } from "lucide-react";

export default function CandidateProfilePage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Nav */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Candidate Profile</h1>
          <div className="flex items-center gap-3">
            <CustomButton variant="outline">Back</CustomButton>
            <CustomButton>
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn Account
            </CustomButton>
          </div>
        </div>

        {/* Main Card */}
        <Card>
          <CardContent>
            {/* Candidate Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">Jerome Bell</h2>
                <p className="text-sm text-gray-500">Senior Software Developer</p>
              </div>
              <div className="flex items-center gap-2">
                <CustomButton size="sm" variant="ghost">Notes</CustomButton>
                <CustomButton size="sm" variant="ghost">Tests</CustomButton>
                <CustomButton size="sm" variant="ghost">History</CustomButton>
              </div>
            </div>

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <InfoBlock label="Email" value="jerome.bell@example.com" icon={<Mail className="w-4 h-4" />} />
              <InfoBlock label="Phone" value="+90 (545) 493 00 00" icon={<Phone className="w-4 h-4" />} />
              <InfoBlock label="DOB" value="03 September 2000 (24 years old)" />
              <InfoBlock label="Salary Expectation" value="$24,000" />
              <InfoBlock label="Location" value="Istanbul, Turkey, Europe" />
              <InfoBlock label="Work Type" value="Remote, Full-time, Freelance" />
            </div>

            {/* Resume */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-1">Resume</p>
              <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded">
                <span className="text-sm">jerome-bell-resume.pdf</span>
                <CustomButton size="sm">
                  <FileText className="w-4 h-4 mr-1" />
                  Download
                </CustomButton>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Side Info */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Active Positions */}
          <Card>
            <CardContent>
              <h3 className="font-semibold mb-2">Active Positions</h3>
              <div className="space-y-3">
                <PositionCard role="Front-End Developer" company="Techydev" status="Interview" />
                <PositionCard role="Sr. Front-End Developer" company="Anadolu Sigorta" status="Invited" />
                <CustomButton className="w-full mt-3">Show All</CustomButton>
              </div>
            </CardContent>
          </Card>

          {/* Career Status */}
          <Card>
            <CardContent>
              <label className="block text-sm font-medium mb-1">Career Status</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Actively Seeking Job</option>
                <option>Open to Offers</option>
                <option>Not Looking</option>
              </select>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card>
            <CardContent>
              <h3 className="font-semibold mb-2">Personal Info</h3>
              <p className="text-sm flex items-center gap-2"><Phone className="w-4 h-4" /> +90 (545) 493 00 00</p>
              <p className="text-sm flex items-center gap-2 mt-2"><Mail className="w-4 h-4" /> jerome.bell@example.com</p>
              <div className="mt-4">
                <p className="text-sm font-medium mb-1">Resume</p>
                <span className="text-sm">jerome-bell-resume.pdf</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

// ----- Reusable Components -----

function CustomButton({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500";
  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
  };
  const sizes = {
    default: "h-10 px-4 text-sm",
    sm: "h-8 px-3 text-sm",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl shadow-sm ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

function InfoBlock({ label, value, icon }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <div className="flex items-center gap-2 text-sm font-medium">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}

function PositionCard({ role, company, status }) {
  const statusColor = status === "Interview" ? "bg-yellow-100 text-yellow-800" : "bg-purple-100 text-purple-800";
  return (
    <div className="p-3 border rounded-lg flex items-center justify-between">
      <div>
        <p className="font-medium text-sm">{role}</p>
        <p className="text-xs text-gray-500">{company}</p>
      </div>
      <span className={`text-xs font-medium px-2 py-1 rounded ${statusColor}`}>
        {status}
      </span>
    </div>
  );
}

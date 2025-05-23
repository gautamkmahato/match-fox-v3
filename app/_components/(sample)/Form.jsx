"use client";

import { useState } from "react";
import { ArrowRight, XCircle, ChevronDown } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("Tom Bekker");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");

  const handlePhoneChange = (value) => {
    setPhone(value);
    const phoneRegex = /^\(\+90\)\s5\d{2}\s\d{3}\s\d{2}\s\d{2}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError("Error message");
    } else {
      setPhoneError("");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#1D1D1F] mb-1">
        We can’t wait to meet you.
      </h1>
      <p className="text-sm text-[#636366] mb-6">
        Please fill in the details below so that we can get in contact with you.
      </p>

      <label className="block text-sm text-[#1D1D1F] font-medium mb-1">
        Please enter your name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-[#D1D1D6] focus:outline-none focus:ring-2 focus:ring-[#A3A3FF] text-[#1D1D1F] placeholder-[#C7C7CC] mb-5"
      />

      <label className="block text-sm text-[#1D1D1F] font-medium mb-1">
        Please enter a phone number
      </label>
      <div className="relative mb-5">
        <input
          type="text"
          value={phone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          placeholder="(+90) 543 779 94 64"
          className={`w-full px-4 py-3 rounded-md border text-[#1D1D1F] placeholder-[#C7C7CC] focus:outline-none focus:ring-2 ${
            phoneError
              ? "border-red-400 bg-red-50 focus:ring-red-200"
              : "border-[#D1D1D6] focus:ring-[#A3A3FF]"
          }`}
        />
        {phoneError && (
          <XCircle className="absolute right-3 top-3 text-red-500 w-5 h-5" />
        )}
        {phoneError && (
          <p className="text-sm text-red-500 mt-1">{phoneError}</p>
        )}
      </div>

      <label className="block text-sm text-[#1D1D1F] font-medium mb-1">
        Please select your role
      </label>
      <div className="relative mb-5">
        <select
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.target.value)}
          className="w-full appearance-none px-4 py-3 rounded-md border border-[#D1D1D6] bg-white text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#A3A3FF]"
        >
          <option value="">Select a role</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="product_manager">Product Manager</option>
        </select>
        <ChevronDown className="absolute right-3 top-3 pointer-events-none text-[#636366] w-4 h-4" />
      </div>

      <label className="block text-sm text-[#1D1D1F] font-medium mb-1">
        Please enter a link to your website (optional)
      </label>
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-[#D1D1D6] focus:outline-none focus:ring-2 focus:ring-[#A3A3FF] text-[#1D1D1F] placeholder-[#C7C7CC] mb-8"
      />

      <div className="flex justify-between items-center">
        <button className="text-[#636366] text-sm font-medium">Back</button>
        <button className="bg-[#6E6EFF] text-white px-5 py-3 rounded-md text-sm font-medium flex items-center gap-2">
          Next Step
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

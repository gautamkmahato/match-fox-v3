// components/HeroSection.jsx
import Link from 'next/link';
import Header from './Header';
import { ArrowBigRight, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    // Add `relative` and `isolate` to manage stacking context
    <section
      className="h-screen relative isolate bg-[radial-gradient(ellipse_at_center,_#0f0f0f,_#52525b,_#a1a1aa,_#e4e4e7)] pb-24 text-center overflow-hidden" // Added overflow-hidden for tidiness

    >
        <Header />
      {/* The Dot Pattern using ::before pseudo-element */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true" // Hide decorative element from screen readers
      >
        {/* Left Dots (20% width) */}
        <div className="absolute top-0 left-0 w-[100%] h-full bg-[radial-gradient(theme(colors.gray.600)_1px,transparent_1px)] [background-size:26px_26px]"></div>

        {/* Right Dots (20% width) */}
        {/* <div className="absolute top-15 right-0 w-[25%] h-full bg-[radial-gradient(theme(colors.gray.400)_1px,transparent_1px)] [background-size:26px_26px]"></div> */}
      </div>

      {/* Content Container - ensure it's above the pseudo-element */}
      {/* No extra z-index needed here thanks to `isolate` on the parent */}
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
          Supercharge your <br /> interview with AI
        </h1>
        <p className="text-md md:text-xl lg:text-[16px] text-gray-200 max-w-2xl mx-auto mb-10">
          Payments, auth, gating, CRM, email—it's all here. Ditch the cookie cutter platforms and monetize
          your <span className='font-semibold text-gray-50'>membership site, SaaS, course, community</span>, or association using your favorite tools.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/signup"
            className="flex gap-2 items-center px-5 py-3 text-sm font-semibold text-gray-50 bg-[#462eb4]  hover:bg-purple-800 rounded-md shadow-2xl hover:shadow w-full sm:w-auto"
          >
            Try Now
            <ArrowRight className='w-4 h-4' />
          </Link>
          <Link
            href="/is-it-for-me" // Example link
            className="px-8 py-3 text-sm font-semibold text-gray-800 bg-purple-50 hover:bg-amber-50 rounded-lg shadow-2xl hover:shadow w-full sm:w-auto"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
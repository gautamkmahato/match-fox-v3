import Header from "../_components/(home)/Header";
import SiteFooter from "../_components/(home)/SiteFooter";

export default function AboutPage() {
  return (
    <>
    <Header />
    <div className="min-h-screen text-gray-900 px-6 py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <section>
          <h1 className="text-4xl font-bold text-blue-700 mb-4">About Hirenom</h1>
          <p className="text-lg leading-relaxed">
            <strong>Hirenom</strong> is an AI-powered career platform designed to elevate how individuals prepare for job opportunities and how organizations evaluate talent. 
            We help candidates stand out and companies hire smarter — faster.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">🚀 What We Offer</h2>
          <ul className="list-disc list-inside space-y-3 text-base">
            <li>
              <strong>AI Mock Interview Platform:</strong> Real-time, voice-based technical interviews powered by AI that simulate real interviewer behavior and provide structured feedback.
            </li>
            <li>
              <strong>AI Resume Creator:</strong> Instantly generate professional, ATS-optimized resumes tailored for your role, domain, and experience.
            </li>
            <li>
              <strong>LinkedIn Profile Optimizer:</strong> Improve your professional visibility and profile strength using AI suggestions and keyword insights.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">🌍 Our Vision</h2>
          <p>
            We envision a future where career growth is data-driven, unbiased, and deeply personalized.
            At Hirenom, we believe in empowering talent at every stage — from resume to recruitment.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 mb-3">💡 Why Hirenom?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Reduce anxiety before interviews by practicing in realistic AI-driven scenarios</li>
            <li>Craft impactful resumes in minutes — not hours</li>
            <li>Stand out on LinkedIn with a profile that recruiters notice</li>
            <li>Streamline your preparation with actionable insights and feedback</li>
          </ul>
        </section>

        <section className="p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Join the Future of Hiring</h3>
          <p>
            Whether you're a job seeker, student, or recruiter, Hirenom is your intelligent partner in professional growth. 
            Let’s reimagine hiring, preparation, and personal branding — powered by AI.
          </p>
        </section>
      </div>
    </div>
    <SiteFooter />
    </>
  );
}

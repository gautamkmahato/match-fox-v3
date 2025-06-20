import Header from "@/app/_components/(home)/Header";
import SiteFooter from "@/app/_components/(home)/SiteFooter";

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Terms & Conditions</h1>

          <p className="text-gray-700 mb-6">
            Welcome to <strong>Hirenom</strong>. By accessing and using our platform, you agree to the following terms. 
            Please read them carefully to understand your rights and responsibilities.
          </p>

          <div className="space-y-4 text-gray-800 text-base leading-relaxed">
            <p>
              ✅ <strong>Legal Compliance:</strong> All users must comply with applicable laws and regulations while using the platform.
            </p>
            <p>
              🔐 <strong>Subscription Access:</strong> Feature access is determined by your active subscription plan. Downgrading may result in limited access.
            </p>
            <p>
              🚫 <strong>Prohibited Usage:</strong> Misuse, abuse, or manipulation of the platform, including automated scraping, unauthorized sharing, or unethical behavior, may lead to account suspension or permanent termination without prior notice.
            </p>
            <p>
              📩 <strong>Contact:</strong> For questions or clarification regarding these terms, please reach out to us at 
              <a href="mailto:gkmbusiness74@gmail.com" className="text-blue-600 underline ml-1">gkmbusiness74@gmail.com</a>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

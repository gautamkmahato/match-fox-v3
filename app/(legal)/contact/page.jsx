import Header from "@/app/_components/(home)/Header";
import SiteFooter from "@/app/_components/(home)/SiteFooter";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
          <h1 className="text-3xl font-bold text-blue-700">Contact Us</h1>

          <p className="text-gray-700 text-base">
            We'd love to hear from you! If you have questions, suggestions, or need support, feel free to get in touch:
          </p>

          <div className="space-y-4 text-gray-800">
            <div>
              <span className="font-semibold text-blue-600">Name:</span>
              <p>Hirenom</p>
            </div>

            <div>
              <span className="font-semibold text-blue-600">Email:</span>
              <p>
                <a href="mailto:gkmbusiness74@gmail.com" className="text-blue-500 underline">
                  gkmbusiness74@gmail.com
                </a>
              </p>
            </div>

            <div>
              <span className="font-semibold text-blue-600">Phone:</span>
              <p>
                <a href="tel:+91-9990605100" className="text-blue-500 underline">
                  +91-999-060-5100
                </a>
              </p>
            </div>

            <div>
              <span className="font-semibold text-blue-600">Address:</span>
              <p>
                Bengaluru, India
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

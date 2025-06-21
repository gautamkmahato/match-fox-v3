import Header from "@/app/_components/(home)/Header";
import SiteFooter from "@/app/_components/(home)/SiteFooter";

export default function CancellationRefundPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">
            Cancellation & Refund Policy
          </h1>

          <p className="text-gray-700 mb-4">
            At <strong>Hirenom</strong>, we strive to offer transparent and fair policies for all our users. Please review our cancellation and refund terms below.
          </p>

          <div className="space-y-4 text-gray-800 text-base">
            <p>
              🔒 <strong>Non-Cancellable Subscriptions:</strong> Once a subscription is purchased, it cannot be canceled or refunded unless required by applicable law.
            </p>
            <p>
              💳 <strong>Duplicate or Failed Transactions:</strong> In the event of duplicate payments or technical errors, please contact our support team with your payment details. We’ll be happy to assist.
            </p>
            <p>
              Once if the refund is approved by GAUTAM KUMAR MAHATO, it will take 7-10 days for process and credited to the original mode of payment            </p>
            <p>
              📧 For support, contact us at <a href="mailto:gkmbusiness74@gmail.com" className="text-blue-600 underline">gkmbusiness74@gmail.com.com</a>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

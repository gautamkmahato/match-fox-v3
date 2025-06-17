import Header from "@/app/_components/(home)/Header";

export default function CancellationRefundPage() {
  return (
    <>
    <Header />
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Cancellation & Refund Policy</h1>
      <p className="mb-4">
        Once a subscription is purchased, it cannot be canceled or refunded unless required by applicable law. In case of duplicate payments or technical errors, please contact our support team for resolution.
      </p>
      <p>
        We aim to process refunds, if applicable, within 5-7 business days after verification.
      </p>
    </main>
    </>
  );
}

import Header from "@/app/_components/(home)/Header";
import SiteFooter from "@/app/_components/(home)/SiteFooter";

export default function ShippingPage() {
  return (
    <>
    <Header />
        <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Shipping Policy</h1>
      <p className="mb-4">
        As Hirenom is a digital SaaS product, no physical goods are shipped. Once a payment is completed, credits or access are added instantly to your account.
      </p>
      <p>
        For any issues with access, please contact support within 24 hours of purchase.
      </p>
    </main>
    <SiteFooter />
    </>
  );
}

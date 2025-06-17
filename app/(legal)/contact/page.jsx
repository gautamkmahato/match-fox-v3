import Header from "@/app/_components/(home)/Header";

export default function ContactPage() {
  return (
    <>
    <Header />
        <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">For any queries or support, reach out to us:</p>
      <ul className="list-disc pl-6">
        <li>Email: gkmbusiness74@gmail.com</li>
        <li>Phone: +91-834-0605124</li>
        <li>Address: India</li>
      </ul>
    </main>
    </>
  );
}

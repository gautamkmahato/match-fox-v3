export default function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">I</span>
              </div>
              <span className="font-bold text-lg">Intervio</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              An artificial intelligence Platform that can help company to choose the best talent to work with us.
            </p>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">COMPANY</h3>
            <ul className="space-y-2">
              {["About Us", "Careers", "Features", "Testimonial", "Contact Us"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">HELP</h3>
            <ul className="space-y-2">
              {["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">NEWSLETTER</h3>
            <div className="mt-4">
              <form className="space-y-2">
                <div className="flex rounded-md overflow-hidden">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-2 text-sm bg-white text-gray-900 placeholder:text-xs focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded text-sm transition duration-150"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-gray-400 text-sm">© Copyright 2023. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}

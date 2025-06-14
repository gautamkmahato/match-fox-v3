import { PlayCircle } from 'lucide-react'; // Icon for the demo button
import Image from 'next/image';
import thumb from '../../../public/call.png'



const ProductShowcase = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-12 relative z-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Replace this div with the actual Image component */}
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 relative">
           {/* --- START: Replace this div with next/image --- */}
           <div className=" bg-gray-200 flex items-center justify-center text-gray-400">
             {/* Placeholder content - remove when adding the image */}
             <Image src={thumb} alt='thumb' />
           </div>
           {/* --- END: Replace this div --- */}

          {/* Example using next/image (assuming you have dashboard.png in public/): */}
          {/*
          <Image
            src="/dashboard.png" // Make sure this image exists in your `public` folder
            alt="Outseta dashboard screenshot"
            width={1920} // Provide intrinsic width
            height={1080} // Provide intrinsic height
            layout="responsive" // Makes image scale with container
            priority // Load image sooner if it's LCP
            className="w-full h-auto" // Basic styling
          />
           <button className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-70 text-white px-6 py-3 rounded-full flex items-center space-x-3 hover:bg-opacity-80 transition duration-200">
                <PlayCircle size={24} />
                <div className="text-left">
                    <span className="font-semibold block">Watch product demo</span>
                    <span className="text-xs text-gray-300 block">See Geoff give a full tour</span>
                </div>
           </button>
          */}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
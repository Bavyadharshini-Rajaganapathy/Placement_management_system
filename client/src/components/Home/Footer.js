import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-black h-[30vh] p-10 text-base md:text-lg lg:text-xl flex flex-col md:flex-row justify-between items-start">
      
      {/* Main Placement link */}
      <div className="flex flex-col items-start mt-10 "> {/* Increased the top margin */}
        <a href="http://www.placements.com" className="hover:underline text-lg md:text-xl lg:text-3xl font-libre-caslon">www.placements.com</a>
      </div>

      {/* About Section */}
      <div className="flex flex-col space-y-2 mt-6 md:mt-0">
        <h4 className="font-bold text-lg md:text-xl lg:text-2xl">About</h4>
        <a href="http://www.placements.com/admission" className="hover:underline text-lg md:text-xl lg:text-2xl">Admission</a>
        <a href="http://www.placements.com/facilities" className="hover:underline text-lg md:text-xl lg:text-2xl">Facilities</a>
      </div>

      {/* Placements Section */}
      <div className="flex flex-col space-y-2 mt-6 md:mt-0">
        <h4 className="font-bold text-lg md:text-xl lg:text-2xl">Placements</h4>
        <a href="http://www.placements.com/training" className="hover:underline text-lg md:text-xl lg:text-2xl">Placement Training</a>
        <a href="http://www.placements.com/details" className="hover:underline text-lg md:text-xl lg:text-2xl">Details</a>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col space-y-2 mt-6 md:mt-0">
        <h4 className="font-bold text-lg md:text-xl lg:text-2xl">Contact</h4>
        <p className="text-lg md:text-xl lg:text-2xl">+91 89999 72222</p>
        <p className="hover:underline text-lg md:text-xl lg:text-2xl">placement@gmail.com</p>
      </div>
      
    </footer>
  );
};

export default Footer;

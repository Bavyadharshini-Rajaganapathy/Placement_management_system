import React from 'react';

const AboutUs = () => {
  return (
    <div
      className="bg-cover bg-no-repeat bg-top min-h-screen overflow-hidden"
      style={{ backgroundImage: "url('/images/image9.jpg')" }}
    >
      {/* Title */}
      <div className='ml-32'>
      <p className="font-windsong text-6xl text-gray-800 ml-96 mt-64 mb-8">
        About Us
      </p>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl p-5 text-black-500 ml-40">
        <p className="font-cormorant text-lg lg:text-3xl leading-relaxed">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome to our Placement Management System, where <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;opportunities meet
          ambition. Our mission is to bridge the gap between aspiring candidates
          and leading companies, offering a streamlined process for both
          &nbsp;&nbsp;&nbsp;&nbsp;recruitment and career development. Every feature is designed to
          empower students and recruiters alike, promoting efficiency,
          transparency, and accessibility. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Join us in making career dreams a
          reality and discover the future of &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;placement management.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;

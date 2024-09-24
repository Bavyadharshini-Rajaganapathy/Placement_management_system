import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const MainSection = () => {
  return (
    <main className="bg-cover bg-center bg-no-repeat relative h-[80vh]" style={{ backgroundImage: `url('/images/image4.jpg')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-left">
        <div className="text-white text-xl md:text-2xl lg:text-4xl ml-6 md:ml-12 lg:ml-28 font-gowun">
          <TypeAnimation 
            sequence={[
              'The only way to do great work is to',
              1000, 
              'Love what you do',
              1000
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: '2em', display: 'inline-block' }}
            repeat={Infinity}
          />
        </div>
      </div>
    </main>
  );
};

export default MainSection;

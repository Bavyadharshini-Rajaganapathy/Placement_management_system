import React from 'react';

const TopCompanies = () => {
  const companies = [
    { name: 'Infosys', description: 'A global leader in next-generation digital services and consulting' },
    { name: 'Wipro', description: 'A leading global end-to-end IT transformation, consulting' },
    { name: 'Soliton Technologies', description: 'Combines the platforms approach and the global delivery model' },
    { name: 'Accenture', description: 'A global multinational professional services company' },
  ];

  return (
    <div className="min-h-[800px] flex justify-center items-center bg-gray-100 px-6">
      <div className="max-w-6xl w-full">
        <h1 className="text-5xl font-bold text-center mb-12">Top Companies</h1> {/* Increased heading font size */}
        <div className="space-y-8"> {/* Increased space between the list items */}
          {companies.map((company, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between"> {/* Increased padding */}
              <div className="text-left sm:text-left flex-grow">
                <h2 className="text-3xl font-semibold mb-4">{company.name}</h2> {/* Increased company name size */}
                <p className="text-xl text-gray-600">{company.description}</p> {/* Increased description font size */}
              </div>
              <button 
                className="mt-4 sm:mt-0 bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors duration-300 text-lg sm:text-xl"> {/* Increased button size */}
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
const Features = () => {
  const FeaturesArray = ["Cryptocurrencies", "Exchange", "Community", "Product", "Learn"];
  const FeaturesButton = ["Login", "Register"];

  return (
    <div className="px-4 sm:px-6 lg:px-24 py-6 mt-4 border-t-2 border-b-2 border-gray-600 bg-[#1a1c2c]">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
        <div className="bg-[#151822] text-white py-2 px-4 flex flex-wrap items-center gap-4 sm:gap-6 rounded-md shadow-lg">
          {FeaturesArray.map((item, index) => (
            <h1 key={index} className="text-base sm:text-lg font-semibold tracking-wide">{item}</h1>
          ))}
        </div>

        <div className="text-white py-2 px-4 flex items-center gap-4 sm:gap-8">
          {FeaturesButton.map((item, index) => (
            <button
              key={index}
              className="bg-[#3b3e55] py-2 px-4 rounded-md font-semibold hover:bg-[#565a77] transition duration-300"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

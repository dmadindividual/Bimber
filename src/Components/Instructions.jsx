import React, { useState, useEffect } from "react";

const Instructions = () => {
  const [step, setStep] = useState(0);

  const instructions = [
    "Welcome to Bimber! This website helps you track cryptocurrency prices and market data.",
    "Navigate through the menu to explore different sections such as Cryptocurrencies, Exchange, Community, Product, and Learn.",
    "Use the search bar at the top to quickly find information about specific cryptocurrencies.",
    "Don't forget to check the trending section for the latest popular coins!",
    "You can switch between different currencies using the dropdown menu in the header.",
    "Ready to get started? Click OK to begin your journey!"
  ];

  useEffect(() => {
    // Check if instructions have been shown in this session
    const instructionsShown = sessionStorage.getItem("instructionsShown");
    if (instructionsShown) {
      setStep(-1); // Skip instructions if already shown
    }
  }, []);

  const handleNextStep = () => {
    if (step < instructions.length - 1) {
      setStep(step + 1);
    } else {
      // Close the instructions UI when the last step is reached
      setStep(-1);
      // Mark instructions as shown in this session
      sessionStorage.setItem("instructionsShown", "true");
    }
  };

  return (
    step !== -1 && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-black rounded-lg p-8 max-w-md mx-auto text-center shadow-xl">
          <h2 className="text-4xl text-white bg-inherit font-bold text-gray-800 mb-4">Welcome to Bimber!</h2>
          <p className="bg-inherit text-lg text-white mb-6">{instructions[step]}</p>
          <button
            onClick={handleNextStep}
            className="bg-sky-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    )
  );
};

export default Instructions;

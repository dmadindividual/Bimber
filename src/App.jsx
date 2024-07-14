import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import CoinId from './Pages/CoinId';
import LaptopOnlyComponent from './Components/LaptopOnlyComponent';
import { FaSpinner } from 'react-icons/fa'; // Import the spinner icon

const App = () => {
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const checkIfLaptop = () => {
      const screenWidth = window.innerWidth;
      const isLaptopSize = screenWidth > 1024; // Adjust as per your laptop screen size detection
      setIsLaptop(isLaptopSize);
    };

    // Initial check on component mount
    checkIfLaptop();

    // Event listener for resizing (optional)
    window.addEventListener('resize', checkIfLaptop);

    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener('resize', checkIfLaptop);
    };
  }, []);

  // If it's not a laptop, show the message with spinner
  if (!isLaptop) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl mb-4 text-white">This website is only accessible on laptops. Please visit from a laptop.</h1>
          <div className="inline-flex">
            <FaSpinner className="animate-spin text-blue-400 mr-2" />
            <FaSpinner className="animate-spin text-yellow-400 mr-2" />
            <FaSpinner className="animate-spin text-red-400 mr-2" />
            <FaSpinner className="animate-spin text-green-400" />
          </div>
        </div>
      </div>
    );
  }

  // If it's a laptop, render the normal application
  return (
    <div className="App w-screen p-4 px-8">
      <LaptopOnlyComponent />

      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:coinId" element={<CoinId />} />
      </Routes>
    </div>
  );
};

export default App;

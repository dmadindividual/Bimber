import React, { useEffect, useState } from "react";

const LaptopOnlyComponent = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileDevice = /iphone|ipod|android|blackberry|opera mini|iemobile|wpdesktop/i.test(userAgent);

    setIsMobile(isMobileDevice);
  }, []);

  if (isMobile) {
    return (
      <div className="container mx-auto mt-6 text-center">
        <h1 className="text-3xl font-bold text-red-500">Bimber is only accessible on laptops or desktops.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-6">
      {/* Your Bimber application content goes here */}
      <h1 className="text-3xl font-bold">Welcome to Bimber!</h1>
      <p className="text-lg mt-4">This content is accessible on laptops or desktops.</p>
    </div>
  );
};

export default LaptopOnlyComponent;

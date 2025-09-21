import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-xl font-bold">Sahayak App</h1>
        <nav>
          <ul className="flex gap-6">
            <li><a href="#home" className="hover:text-gray-200">Home</a></li>
            <li><a href="#features" className="hover:text-gray-200">Features</a></li>
            <li><a href="#contact" className="hover:text-gray-200">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

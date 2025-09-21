import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-blue-600 text-white py-6 mt-20">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Sahayak App. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

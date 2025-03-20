import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Loading from "./Loading";

const Footer = () => {

    const { categories, isLoading } = useContext(AppContext);



  return (
    <footer className=" bg-gray-900 text-white py-6 mt-auto">
        {isLoading && <Loading/>}
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Shop Categories */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop by Category</h3>
          <ul className="space-y-2">
            { categories.slice(0,5).map((category) => ( // Only display the first 4 categories
              <li key={category.id}><a href={`/category/${category.name}`} className="hover:underline">{category.name}</a></li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="" className="hover:underline">Help Center</a></li>
            <li><a href="" className="hover:underline">Returns & Refunds</a></li>
            <li><a href="" className="hover:underline">Shipping Info</a></li>
            <li><a href="" className="hover:underline">FAQs</a></li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
  <h3 className="text-lg font-semibold mb-3">About Us</h3>
  <ul className="space-y-2">
    <li><a href="/about" className="hover:underline">Darla's Store</a></li>
    <li><a href="mailto:vishnudarla7072@gmail.com" className="hover:underline">darlastore2025@gmail.com</a></li>
    <li><a href="" target="_blank" className="hover:underline">LinkedIn</a></li>
    {/* <li><a href="/contact" className="hover:underline">Contact Us</a></li> */}
  </ul>
</div>


        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-gray-400 text-sm mt-6">
        © {new Date().getFullYear()} ShopEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

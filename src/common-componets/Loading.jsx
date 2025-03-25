import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-100 flex flex-col  justify-center items-center bg-black opacity-50  ">
    <p className="text-red-500 font-bold text-center">
      <marquee behavior="scroll" direction="left">
        Please wait, sometimes loading data takes few seconds or else check my github repository
      </marquee>
      <a href="https://github.com/uday900/Ecommerce-Backend"
      className="text-blue-500 text-center" target="_blank"> Github Repo link</a>

      </p>
     
 
      <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin">
       
      </div>
    </div>
  );
};

export default Loading;


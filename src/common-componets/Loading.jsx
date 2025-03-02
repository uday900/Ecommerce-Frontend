// import React from 'react';

// const Loading = () => {
//   return (
//     <div className="flex justify-center items-center h-screen bg-black bg-opacity-50 fixed inset-0">
//       <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
//     </div>
//   );
// };

// export default Loading;
import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-100 flex justify-center items-center bg-black/30 backdrop-blur-md">
      <div className="border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Loading;


import React from 'react';

export default function ConfirmationModal({ setIsConfirmationModalOpen, onConfirm, message }) {


  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <p className="text-lg font-semibold mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={()=>setIsConfirmationModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={()=>onConfirm(true)}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

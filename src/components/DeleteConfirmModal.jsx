import React from 'react'

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, companyName }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-[15px] flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6" onClick={(e) => e.stopPropagation()}>
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Delete Application?
        </h3>
        <p className="text-gray-600 text-center mb-6">
          Are you sure you want to delete the application for <span className="font-semibold">{companyName}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default DeleteConfirmModal
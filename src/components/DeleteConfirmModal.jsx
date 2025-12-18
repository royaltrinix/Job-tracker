import { AlertTriangle } from "lucide-react"

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, companyName }) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-[fade-in_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-[scale-in_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">Delete Application?</h3>
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          Are you sure you want to delete the application for{" "}
          <span className="font-bold text-gray-900">{companyName}</span>?
          <br />
          <span className="text-red-600 font-medium">This action cannot be undone.</span>
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmModal

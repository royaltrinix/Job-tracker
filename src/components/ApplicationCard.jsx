import { MapPin, Calendar, DollarSign, Pencil, Trash2 } from "lucide-react"

const ApplicationCard = ({ application, handleEdit, handleDelete, handleAcceptOffer, handleRejectOffer }) => {
  const getDaysAgo = (dateApplied) => {
    const today = new Date()
    const appliedDate = new Date(dateApplied)
    const diffTime = Math.abs(today - appliedDate)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusColor = (status) => {
    const colors = {
      Applied: "bg-blue-50 text-blue-700 border-blue-200",
      "Screening Call": "bg-amber-50 text-amber-700 border-amber-200",
      "Technical Interview": "bg-orange-50 text-orange-700 border-orange-200",
      "Final Interview": "bg-violet-50 text-violet-700 border-violet-200",
      Offer: "bg-emerald-50 text-emerald-700 border-emerald-200",
      Rejected: "bg-gray-50 text-gray-700 border-gray-200",
      Accepted: "bg-emerald-600 text-white border-emerald-700",
    }
    return colors[status] || "bg-gray-50 text-gray-700 border-gray-200"
  }

  const displaySalary = () => {
    if (application.salary_min && application.salary_max) {
      return `£${application.salary_min.toLocaleString()} - £${application.salary_max.toLocaleString()}`
    } else if (application.salary_max) {
      return `Up to £${application.salary_max.toLocaleString()}`
    } else if (application.salary_min) {
      return `From £${application.salary_min.toLocaleString()}`
    } else {
      return null
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group animate-[slide-up_0.4s_ease-out]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
            {application.company_name}
          </h3>
          <p className="text-lg text-gray-700 font-medium">{application.position_title}</p>
        </div>

        {/* Status Badge */}
        <span
          className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:scale-105 ${getStatusColor(
            application.status,
          )}`}
        >
          {application.status}
        </span>
      </div>

      {/* Info Row */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        {application.location && (
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>{application.location}</span>
          </div>
        )}
        {displaySalary() && (
          <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-lg">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 font-medium">{displaySalary()}</span>
          </div>
        )}
      </div>

      {/* Date and Method */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-5 pb-5 border-b border-gray-100">
        <Calendar className="w-4 h-4" />
        <span>
          Applied {getDaysAgo(application.date_applied)} days ago • via{" "}
          <span className="font-medium text-gray-700">{application.application_method}</span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {application.status === "Offer" && handleAcceptOffer && handleRejectOffer && (
          <select
            onChange={(e) => {
              if (e.target.value === "Accept") {
                handleAcceptOffer(application.id)
              } else if (e.target.value === "Decline") {
                handleRejectOffer(application.id)
              }
              e.target.value = ""
            }}
            className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-200 cursor-pointer font-medium shadow-sm hover:shadow-md"
          >
            <option value="">Offer Action...</option>
            <option value="Accept">✓ Accept Offer</option>
            <option value="Decline">✗ Decline Offer</option>
          </select>
        )}

        {handleEdit && (
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md hover:scale-105"
            onClick={() => handleEdit(application.id)}
          >
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        )}

        {handleDelete && (
          <button
            className="flex items-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md hover:scale-105"
            onClick={() => handleDelete(application.id)}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default ApplicationCard

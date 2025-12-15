import React from "react";

const ApplicationCard = ({
  application,
  handleEdit,
  handleDelete,
  handleAcceptOffer,
  handleRejectOffer,
}) => {
  const getDaysAgo = (dateApplied) => {
    const today = new Date();
    const appliedDate = new Date(dateApplied);
    const diffTime = Math.abs(today - appliedDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status) => {
    if (status === "Applied") {
      return "bg-blue-100 text-blue-800";
    } else if (status === "Screening Call") {
      return "bg-yellow-100 text-yellow-800";
    } else if (status === "Technical Interview") {
      return "bg-orange-100 text-orange-800";
    } else if (status === "Final Interview") {
      return "bg-purple-100 text-purple-800";
    } else if (status === "Offer") {
      return "bg-green-100 text-green-800";
    } else if (status === "Rejected") {
      return "bg-gray-100 text-gray-800";
    } else if (status === "Accepted") {
      return "bg-green-600 text-white";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const displaySalary = () => {
    if (application.salary_min && application.salary_max) {
      return `💷 £${application.salary_min.toLocaleString()} - £${application.salary_max.toLocaleString()}`;
    } else if (application.salary_max) {
      return `💷 Up to £${application.salary_max.toLocaleString()}`;
    } else if (application.salary_min) {
      return `💷 From £${application.salary_min.toLocaleString()}`;
    } else {
      return null;
    }
  };
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <p className="text-xl font-bold text-gray-900">
          {application.company_name}
        </p>
        {/* Status badge goes here */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            application.status
          )}`}
        >
          {application.status}
        </span>
      </div>

      <p className="text-lg text-gray-700 mb-3">{application.position_title}</p>

      <div className="flex gap-3 text-sm text-gray-600 mb-2">
        {application.location && <p>📍 {application.location}</p>}
        {displaySalary() && <p>{displaySalary()}</p>}
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Applied {getDaysAgo(application.date_applied)} days ago • via{" "}
        {application.application_method}
      </p>

      <div className="flex gap-3">
        {application.status === "Offer" &&
          handleAcceptOffer &&
          handleRejectOffer && (
            <select
              onChange={(e) => {
                if (e.target.value === "Accept") {
                  handleAcceptOffer(application.id);
                } else if (e.target.value === "Decline") {
                  handleRejectOffer(application.id);
                }
                e.target.value = "";
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
            >
              <option value="">Offer Action...</option>
              <option value="Accept">✓ Accept Offer</option>
              <option value="Decline">✗ Decline Offer</option>
            </select>
          )}

        {handleEdit && (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => handleEdit(application.id)}
          >
            Edit
          </button>
        )}

        {handleDelete && (
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            onClick={() => handleDelete(application.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplicationCard;

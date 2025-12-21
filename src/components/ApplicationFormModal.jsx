import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { userAuth } from "../context/AuthContext"
import { X, Building, Briefcase, MapPin, DollarSign, Calendar, FileText, Loader2, Sparkles } from "lucide-react"
import { extractJobFromUrl } from "../services/jobScraper"

export const ApplicationFormModal = ({ isOpen, onClose, application, onSave }) => {
  const { session } = userAuth()

  const [formData, setFormData] = useState({
    company_name: "",
    position_title: "",
    job_url: "",
    location: "",
    salary_min: "",
    salary_max: "",
    date_applied: new Date().toISOString().split("T")[0],
    status: "Applied",
    application_method: "LinkedIn",
    notes: "",
  })

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState("")
  const [fetchSuccess, setFetchSuccess] = useState(false)

  useEffect(() => {
    if (application) {
      setFormData({
        company_name: application.company_name || "",
        position_title: application.position_title || "",
        job_url: application.job_url || "",
        location: application.location || "",
        salary_min: application.salary_min || "",
        salary_max: application.salary_max || "",
        date_applied: application.date_applied || new Date().toISOString().split("T")[0],
        status: application.status || "Applied",
        application_method: application.application_method || "LinkedIn",
        notes: application.notes || "",
      })
    } else {
      setFormData({
        company_name: "",
        position_title: "",
        job_url: "",
        location: "",
        salary_min: "",
        salary_max: "",
        date_applied: new Date().toISOString().split("T")[0],
        status: "Applied",
        application_method: "LinkedIn",
        notes: "",
      })
    }
    setFetchSuccess(false)
    setError("")
  }, [application, isOpen])

  const handleFetchJobDetails = async () => {
    if (!formData.job_url) {
      setError("Please enter a job URL first")
      return
    }

    setFetching(true)
    setError("")
    setFetchSuccess(false)

    try {
      console.log("🔍 Fetching job details from:", formData.job_url)
      
      const jobDetails = await extractJobFromUrl(formData.job_url)
      
      console.log("✅ Received job details:", jobDetails)

      // Auto-fill form with extracted data
      setFormData(prev => ({
        ...prev,
        company_name: jobDetails.company || prev.company_name,
        position_title: jobDetails.position || prev.position_title,
        location: jobDetails.location || prev.location,
        salary_min: jobDetails.salary_min || prev.salary_min,
        salary_max: jobDetails.salary_max || prev.salary_max,
        application_method: jobDetails.applicationMethod || prev.application_method,
        notes: jobDetails.description || prev.notes,
      }))

      setFetchSuccess(true)
      setTimeout(() => setFetchSuccess(false), 3000)

    } catch (err) {
      console.error("❌ Fetch error:", err)
      setError(err.message || "Failed to fetch job details. Please try again.")
    } finally {
      setFetching(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    if (
      !formData.company_name ||
      !formData.position_title ||
      !formData.date_applied ||
      !formData.status ||
      !formData.application_method
    ) {
      setError("please fill in all required fields")
      setLoading(false)
      return
    }
    
    try {
      if (application) {
        const { data, error } = await supabase
          .from("applications")
          .update({
            company_name: formData.company_name,
            position_title: formData.position_title,
            job_url: formData.job_url,
            location: formData.location,
            salary_min: formData.salary_min ? Number.parseInt(formData.salary_min) : null,
            salary_max: formData.salary_max ? Number.parseInt(formData.salary_max) : null,
            date_applied: formData.date_applied,
            status: formData.status,
            application_method: formData.application_method,
            notes: formData.notes,
          })
          .eq("id", application.id)
          .select()
        if (error) throw error
        console.log("Updated:", data)
        onSave()
        onClose()
      } else {
        const { data, error } = await supabase
          .from("applications")
          .insert([
            {
              user_id: session.user.id,
              company_name: formData.company_name,
              position_title: formData.position_title,
              job_url: formData.job_url,
              location: formData.location,
              salary_min: formData.salary_min ? Number.parseInt(formData.salary_min) : null,
              salary_max: formData.salary_max ? Number.parseInt(formData.salary_max) : null,
              date_applied: formData.date_applied,
              status: formData.status,
              application_method: formData.application_method,
              notes: formData.notes,
            },
          ])
          .select()
        if (error) throw error
        console.log("Inserted:", data)
        onSave()
        onClose()
      }
    } catch (error) {
      setError("Failed to save application please try again")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-[fade-in_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-[scale-in_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900">
            {application ? "Edit Application" : "Add New Application"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-white rounded-lg transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[calc(90vh-140px)]">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg animate-[slide-up_0.3s_ease-out]">
              <p className="font-medium">{error}</p>
            </div>
          )}

          {fetchSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg animate-[slide-up_0.3s_ease-out] flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <p className="font-medium">Job details fetched successfully! ✨</p>
            </div>
          )}

          {/* Job URL with AI Fetch */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FileText className="w-4 h-4" />
              Job Posting URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                name="job_url"
                value={formData.job_url}
                onChange={handleChange}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="https://linkedin.com/jobs/view/..."
              />
              <button
                type="button"
                onClick={handleFetchJobDetails}
                disabled={fetching || !formData.job_url}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                {fetching ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Fetching...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    AI Fetch
                  </>
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Paste a job URL and click "AI Fetch" to auto-fill details
            </p>
          </div>

          {/* Company Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Building className="w-4 h-4" />
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="e.g., Google UK"
            />
          </div>

          {/* Position Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Briefcase className="w-4 h-4" />
              Position Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="position_title"
              value={formData.position_title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="e.g., Software Engineer"
            />
          </div>

          {/* Location */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="w-4 h-4" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="e.g., London, Remote"
            />
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4" />
                Salary Min (£)
              </label>
              <input
                type="number"
                name="salary_min"
                value={formData.salary_min}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="50000"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <DollarSign className="w-4 h-4" />
                Salary Max (£)
              </label>
              <input
                type="number"
                name="salary_max"
                value={formData.salary_max}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="70000"
              />
            </div>
          </div>

          {/* Date Applied */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Calendar className="w-4 h-4" />
              Date Applied <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="date_applied"
              value={formData.date_applied}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
            >
              <option value="Applied">Applied</option>
              <option value="Screening Call">Screening Call</option>
              <option value="Technical Interview">Technical Interview</option>
              <option value="Final Interview">Final Interview</option>
              <option value="Offer">Offer</option>
            </select>
          </div>

          {/* Application Method */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Application Method <span className="text-red-500">*</span>
            </label>
            <select
              name="application_method"
              value={formData.application_method}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="Company Website">Company Website</option>
              <option value="Indeed">Indeed</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none"
              placeholder="Any additional notes..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl"
            >
              {loading ? "Saving..." : "Save Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import ApplicationCard from "../components/ApplicationCard"
import { ApplicationFormModal } from "../components/ApplicationFormModal"
import DeleteConfirmModal from "../components/DeleteConfirmModal"
import { Plus, Search, Filter } from "lucide-react"

const Applications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedApplication, setSelectedApplication] = useState(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [applicationToDelete, setApplicationToDelete] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [methodFilter, setMethodFilter] = useState("All")
  const [sortBy, setSortBy] = useState("recent")

  const fetchApplications = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .not("status", "in", '("Rejected","Accepted")')
        .order("date_applied", { ascending: false })

      if (error) throw error
      setApplications(data || [])
    } catch (error) {
      console.error("Error fetching applications:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const handleAddNew = () => {
    setSelectedApplication(null)
    setIsModalOpen(true)
  }

  const handleEdit = (application) => {
    setSelectedApplication(application)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (application) => {
    setApplicationToDelete(application)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!applicationToDelete) return

    try {
      const { error } = await supabase.from("applications").delete().eq("id", applicationToDelete.id)

      if (error) throw error

      setDeleteModalOpen(false)
      setApplicationToDelete(null)
      fetchApplications()
    } catch (error) {
      console.error("Error deleting application:", error)
      alert("Failed to delete application")
    }
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
    setApplicationToDelete(null)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedApplication(null)
  }

  const handleSave = () => {
    fetchApplications()
  }

  const handleAcceptOffer = async (id) => {
    try {
      const { error } = await supabase.from("applications").update({ status: "Accepted" }).eq("id", id)

      if (error) throw error
      fetchApplications()
    } catch (error) {
      console.error("Error accepting offer: ", error)
      alert("Failed to accept offer")
    }
  }

  const handleRejectOffer = async (id) => {
    try {
      const { error } = await supabase.from("applications").update({ status: "Rejected" }).eq("id", id)

      if (error) throw error
      fetchApplications()
    } catch (error) {
      console.error("Error rejecting offer: ", error)
      alert("Failed to reject offer")
    }
  }

  const getFilteredApplications = () => {
    let filtered = [...applications]
    if (searchQuery) {
      filtered = filtered.filter(
        (app) =>
          app.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.position_title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((app) => app.status === statusFilter)
    }
    if (methodFilter !== "All") {
      filtered = filtered.filter((app) => app.application_method === methodFilter)
    }

    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.date_applied) - new Date(a.date_applied))
        break
      case "oldest":
        filtered.sort((a, b) => new Date(a.date_applied) - new Date(b.date_applied))
        break
      case "company-asc":
        filtered.sort((a, b) => a.company_name.localeCompare(b.company_name))
        break
      case "company-desc":
        filtered.sort((a, b) => b.company_name.localeCompare(a.company_name))
        break
      default:
        break
    }
    return filtered
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 animate-[fade-in_0.5s_ease-out]">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Applications</h1>
            <p className="text-lg text-gray-600">Track all your job applications</p>
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add New Application
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-6 animate-[slide-up_0.4s_ease-out]">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search company or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Screening Call">Screening Call</option>
              <option value="Technical Interview">Technical Interview</option>
              <option value="Final Interview">Final Interview</option>
              <option value="Offer">Offer</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
            >
              <option value="All">All Methods</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Company Website">Company Website</option>
              <option value="Indeed">Indeed</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Referral">Referral</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
            >
              <option value="recent">Most Recent</option>
              <option value="oldest">Oldest First</option>
              <option value="company-asc">Company (A-Z)</option>
              <option value="company-desc">Company (Z-A)</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100 animate-[scale-in_0.4s_ease-out]">
            <div className="text-7xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-600 text-lg mb-6">Click "Add New Application" to start tracking your job search</p>
          </div>
        ) : (
          <div className="space-y-4">
            {getFilteredApplications().map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
                handleEdit={() => handleEdit(app)}
                handleDelete={() => handleDeleteClick(app)}
                handleAcceptOffer={handleAcceptOffer}
                handleRejectOffer={handleRejectOffer}
              />
            ))}
          </div>
        )}

        {getFilteredApplications().length === 0 && !loading && applications.length > 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100 animate-[scale-in_0.4s_ease-out]">
            <div className="text-7xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No applications found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <ApplicationFormModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        application={selectedApplication}
        onSave={handleSave}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        companyName={applicationToDelete?.company_name}
      />
    </div>
  )
}

export default Applications

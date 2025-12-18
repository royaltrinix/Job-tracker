import { useState, useEffect } from "react"
import ApplicationCard from "../components/ApplicationCard"
import { supabase } from "../lib/supabase"
import { Award } from "lucide-react"

const Offers = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAcceptedOffers = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("status", "Accepted")
        .order("date_applied", { ascending: false })
      if (error) throw error
      setApplications(data || [])
    } catch (error) {
      console.error("Error fetching rejected applications: ", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAcceptedOffers()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this application?")) {
      return
    }
    try {
      const { error } = await supabase.from("applications").delete().eq("id", id)

      if (error) throw error
      fetchAcceptedOffers()
    } catch (error) {
      console.error("Error deleting offer:", error)
      alert("Failed to delete offer")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-blue-50/20 to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-[fade-in_0.5s_ease-out]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Award className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Accepted Offers</h1>
          </div>
          <p className="text-lg text-gray-600 ml-14">Your wins!</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading...</p>
          </div>
        ) : applications.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100 animate-[scale-in_0.4s_ease-out]">
            <div className="text-7xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No accepted offers yet</h3>
            <p className="text-gray-600 text-lg">When you accept a job offer, it will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <ApplicationCard key={app.id} application={app} handleDelete={() => handleDelete(app.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Offers

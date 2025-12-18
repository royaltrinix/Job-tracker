import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import ApplicationCard from "../components/ApplicationCard";
import { TrendingUp, Award, Calendar, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    screening: 0,
    technical: 0,
    final: 0,
    offer: 0,
    thisWeek: 0,
    responseRate: 0,
  });

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .not("status", "in", '("Rejected","Accepted")');

      if (error) throw error;

      setApplications(data || []);
      calculateStats(data || []);
    } catch (error) {
      console.log("error fetch applications: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const calculateStats = (apps) => {
    const total = apps.length;
    const applied = apps.filter((app) => app.status === "Applied").length;
    const screening = apps.filter(
      (app) => app.status === "Screening Call"
    ).length;
    const technical = apps.filter(
      (app) => app.status === "Technical Interview"
    ).length;
    const final = apps.filter((app) => app.status === "Final Interview").length;
    const offer = apps.filter((app) => app.status === "Offer").length;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeek = apps.filter(
      (app) => new Date(app.date_applied) >= oneWeekAgo
    ).length;

    const responded = total - applied;
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

    setStats({
      total,
      applied,
      screening,
      technical,
      final,
      offer,
      thisWeek,
      responseRate,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/20">
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-xl text-gray-600 font-medium">
              Loading your dashboard...
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 animate-[fade-in_0.5s_ease-out]">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-lg text-gray-600">
              Track your job application progress
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group animate-[scale-in_0.3s_ease-out] hover:scale-105">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Total Active
                </p>
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-xs text-gray-500 mt-2">
                Applications in progress
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group animate-[scale-in_0.3s_ease-out_0.1s] hover:scale-105"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Response Rate
                </p>
                <div className="p-2 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-emerald-600">
                {stats.responseRate}%
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Beyond initial application
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group animate-[scale-in_0.3s_ease-out_0.2s] hover:scale-105"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  This Week
                </p>
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-blue-600">
                {stats.thisWeek}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Applications submitted
              </p>
            </div>

            <div
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group animate-[scale-in_0.3s_ease-out_0.3s] hover:scale-105"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Offers
                </p>
                <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
                  <Award className="w-5 h-5 text-amber-600" />
                </div>
              </div>
              <p className="text-4xl font-bold text-amber-600">{stats.offer}</p>
              <p className="text-xs text-gray-500 mt-2">Pending offers</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 mb-8 animate-[slide-up_0.5s_ease-out]">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Applications by Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-200 group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 font-semibold">Applied</span>
                </div>
                <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {stats.applied}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200 group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 font-semibold">
                    Screening Call
                  </span>
                </div>
                <span className="text-2xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                  {stats.screening}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-orange-50 transition-all duration-200 border border-transparent hover:border-orange-200 group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 font-semibold">
                    Technical Interview
                  </span>
                </div>
                <span className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {stats.technical}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-violet-50 transition-all duration-200 border border-transparent hover:border-violet-200 group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-violet-500 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 font-semibold">
                    Final Interview
                  </span>
                </div>
                <span className="text-2xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors">
                  {stats.final}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl hover:bg-emerald-50 transition-all duration-200 border border-transparent hover:border-emerald-200 group">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 font-semibold">Offer</span>
                </div>
                <span className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                  {stats.offer}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Applications */}
          {applications.length > 0 && (
            <div className="animate-[fade-in_0.6s_ease-out]">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Recent Applications
                </h2>

                <Link
                  to="/applications"
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
                >
                  View All
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
              <div className="space-y-4">
                {applications.slice(0, 5).map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

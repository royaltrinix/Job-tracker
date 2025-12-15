import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { supabase } from "../lib/supabase";
import ApplicationCard from "../components/ApplicationCard";

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
    // Total count
    const total = apps.length;

    // Count by status
    const applied = apps.filter((app) => app.status === "Applied").length;
    const screening = apps.filter(
      (app) => app.status === "Screening Call"
    ).length;
    const technical = apps.filter(
      (app) => app.status === "Technical Interview"
    ).length;
    const final = apps.filter((app) => app.status === "Final Interview").length;
    const offer = apps.filter((app) => app.status === "Offer").length;

    // Calculate this week (last 7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeek = apps.filter(
      (app) => new Date(app.date_applied) >= oneWeekAgo
    ).length;

    // Calculate response rate (% that moved beyond "Applied")
    const responded = total - applied;
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

    // Update the stats state
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
    <div>

      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Track your job application progress
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Active Applications
              </p>
              <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <p className="text-sm font-medium text-gray-600 mb-1">
                Response Rate
              </p>
              <p className="text-4xl font-bold text-green-600">
                {stats.responseRate}%
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <p className="text-sm font-medium text-gray-600 mb-1">
                This Week
              </p>
              <p className="text-4xl font-bold text-blue-600">
                {stats.thisWeek}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <p className="text-sm font-medium text-gray-600 mb-1">Offers</p>
              <p className="text-4xl font-bold text-purple-600">
                {stats.offer}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Applications by Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
                  <span className="text-gray-700 font-medium">Applied</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {stats.applied}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-3"></div>
                  <span className="text-gray-700 font-medium">
                    Screening Call
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {stats.screening}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-orange-500 mr-3"></div>
                  <span className="text-gray-700 font-medium">
                    Technical Interview
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {stats.technical}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-3"></div>
                  <span className="text-gray-700 font-medium">
                    Final Interview
                  </span>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {stats.final}
                </span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-3"></div>
                  <span className="text-gray-700 font-medium">Offer</span>
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {stats.offer}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Recent Applications */}
      {applications.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Applications
          </h2>
          <div className="space-y-4">
            {applications.slice(0, 5).map((app) => (
              <ApplicationCard
                key={app.id}
                application={app}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import ApplicationCard from "../components/ApplicationCard";
import { ApplicationFormModal } from "../components/ApplicationFormModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .not("status", "in", '("Rejected","Accepted")')
        .order("date_applied", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAddNew = () => {
    setSelectedApplication(null); // No application = new mode
    setIsModalOpen(true);
  };

  // Open modal for editing
  const handleEdit = (application) => {
    setSelectedApplication(application); // Pass application = edit mode
    setIsModalOpen(true);
  };

  const handleDeleteClick = (application) => {
    setApplicationToDelete(application);
    setDeleteModalOpen(true);
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    if (!applicationToDelete) return;

    try {
      const { error } = await supabase
        .from("applications")
        .delete()
        .eq("id", applicationToDelete.id);

      if (error) throw error;

      // Close modal and refresh
      setDeleteModalOpen(false);
      setApplicationToDelete(null);
      fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application");
    }
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setApplicationToDelete(null);
  };

  // Close modal and refresh list
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedApplication(null);
  };

  const handleSave = () => {
    fetchApplications();
  };
// Accept offer and refresh list
  const handleAcceptOffer = async (id) => {
    try{
      const { error } = await supabase
        .from('applications')
        .update({ status: 'Accepted'})
        .eq('id', id)

        if (error) throw error
        fetchApplications()
    }catch(error){
      console.error('Error accepting offer: ', error)
      alert('Failed to accept offer')
    }
  }
// Reject offer and refresh list
  const handleRejectOffer = async (id) => {
    try{
      const { error } = await supabase  
        .from('applications')
        .update({ status: "Rejected"})
        .eq('id', id)

        if (error) throw error
        fetchApplications()
    }catch(error){
      console.error('Error rejecting offer: ', error)
      alert('Failed to reject offer')
    }
  }


  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
            <p className="mt-2 text-gray-600">
              Track all your job applications
            </p>
          </div>
          <button
            onClick={handleAddNew}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add New Application
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading applications...</p>
          </div>
        ) : applications.length === 0 ? (
          // Empty State
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No applications yet
            </h3>
            <p className="text-gray-600 mb-6">
              Click "Add New Application" to start tracking your job search
            </p>
          </div>
        ) : (
          // Applications List
          <div className="space-y-4">
            {applications.map((app) => (
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
      </div>

      {/* Modal */}
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
  );
};

export default Applications;

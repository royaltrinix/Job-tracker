import React, { useState, useEffect } from 'react'
import ApplicationCard from '../components/ApplicationCard';
import { supabase } from '../lib/supabase';

const Offers = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAcceptedOffers = async () =>{
        setLoading(true)
        try{
            const{ data, error } = await supabase   
                .from('applications')
                .select("*")
                .eq("status", "Accepted")
                .order('date_applied', { ascending: false})
            if (error) throw error
            setApplications(data || [])
        }catch (error){
            console.error('Error fetching rejected applications: ', error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAcceptedOffers()
    }, [])


    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to permanently delete this application?')) {
            return
          }
         try{
            const { error } = await supabase
             .from('applications')
             .delete()
             .eq('id', id)

            if (error) throw error
            fetchAcceptedOffers()
         } catch(error){
            console.error('Error deleting offer:', error)
            alert('Failed to delete offer')
         }
    }
  return (
    <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Accepted Offers 🎉</h1>
                <p className="mt-2 text-gray-600">Your wins!</p>
            </div>
        </div>
        {loading ? (
            <div className="text-center py-12">
                <p className="text-gray-600">Loading...</p>
            </div>
        ) : applications.length === 0 ? (

            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No accepted offers yet</h3>
                <p className="text-gray-600">When you accept a job offer, it will appear here</p>
            </div>
         ) : (
            <div className="space-y-4">
                {applications.map(app => (
                    <ApplicationCard
                        key={app.id}
                        application={app}
                        handleDelete={() => handleDelete(app.id)}
                    />
                ))}
            </div>
         )}
    </div>
  )
}

export default Offers
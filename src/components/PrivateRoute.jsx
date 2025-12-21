import React from 'react'
import { userAuth } from "../context/AuthContext"
import { Navigate,useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { session } = userAuth();  
  const location = useLocation()

  if(session === undefined){
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  if(!session){
    return <Navigate to="/signup" state={{ from: location.pathname }} replace />
  }
  return <>{children}</>
}

export default PrivateRoute
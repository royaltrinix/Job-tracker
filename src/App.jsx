import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import PrivateRoute from "./components/PrivateRoute"
import { AuthContextProvider } from "./context/AuthContext"
import Applications from "./pages/Applications"
import Rejected from "./pages/Rejected"
import Offers from "./pages/Offers"
import { Layout } from "./components/Layout"

function App() {

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path = "/signup" element={<SignUp/> }/>
          <Route path = "/signin" element={<SignIn/> }/>
          <Route element={<Layout />}>
            <Route path = "/dashboard" element= {<PrivateRoute><Dashboard/></PrivateRoute>}/>
            <Route path = "/applications" element={<PrivateRoute><Applications/></PrivateRoute>} />
            <Route path = "/rejected" element={<PrivateRoute><Rejected/></PrivateRoute>} />
            <Route path = "/offers" element={<PrivateRoute><Offers/></PrivateRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
 
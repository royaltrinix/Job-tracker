import { Outlet, useLocation } from "react-router-dom"
import Header from "./Header"

export const Layout = () => {
  const location = useLocation()

  return (
    <>
      <Header />
      <div key={location.pathname} className="animate-page-transition">
        <Outlet />
      </div>
    </>
  )
}
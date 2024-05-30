import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <main className="wrapper">
      <Outlet />
    </main>
  )
}

export default Layout

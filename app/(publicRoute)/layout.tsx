import { Navbar } from "@/components/shared/Navbar"
import React from "react"

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  )
}

export default PublicRoutes

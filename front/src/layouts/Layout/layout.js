import React from 'react'
import Header from '../Header/header'
import { Outlet } from "react-router-dom";

export default function layout() {
  return (
    <>
        <Header />
        <main style={{height: "calc(100vh - 60px)"}} className="p-4 bg-[#F8FAF9] min-h-0 flex md:overflow-y-hidden md:h-auto">
            <Outlet />
        </main>
    </>
  )
}

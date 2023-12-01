import React from 'react'
import Header from '../Header/header'
import { Outlet } from "react-router-dom";

export default function layout() {
  return (
    <>
        <Header />
        <main className="p-4 flex-1 bg-[#F8FAF9] min-h-0 flex">
            <Outlet />
        </main>
    </>
  )
}

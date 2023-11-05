import React from 'react'
import Header from '../Header/header'
import { Outlet } from "react-router-dom";

export default function layout() {
  return (
    <>
        <Header />
        <main className="pt-16">
            <Outlet />
        </main>
    </>
  )
}

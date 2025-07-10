// src/layouts/MainLayout.jsx
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function MainLayout() {
  const [selectedCurrency, setSelectedCurrency] = useState("KSH");

  return (
    <>
      <NavBar selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
      <main className="pt-4">
        <Outlet />
      </main>
    </>
  );
}

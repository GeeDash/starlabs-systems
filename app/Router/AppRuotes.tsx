import React from "react";
import { Routes, Route } from "react-router-dom";
import MainContent from "../components/MainContent";

interface AppRoutesProps {
    onContactClick: () => void;
    onBackToHome: () => void;
    onBrandClick: (brand: string) => void;
  }
  
  const AppRoutes: React.FC<AppRoutesProps> = ({
    onContactClick,
    onBackToHome,
    onBrandClick,
  }) => (
    <Routes>
      <Route
        path="/"
        element={
          <MainContent
            onContactClick={onContactClick}
            onBrandClick={onBrandClick}
          />
        }
      />
    </Routes>
);

export default AppRoutes;
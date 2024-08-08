import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./LandingPage";
import DisplayPage from "./DisplayPage";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "display",
      element: <DisplayPage />,
    },
  ]);

  
  return (
    <div className="App">
      <RouterProvider router = {router}/>
    </div>
  );
};


import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { store } from "./app/store/store";
import router from "./app/routes/router";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: "#1F2937",
          color: "#F9FAFB",
          border: "1px solid #374151",
          borderRadius: "0.5rem",
        },
        success: {
          iconTheme: {
            primary: "#10B981",
            secondary: "#F9FAFB",
          },
        },
        error: {
          iconTheme: {
            primary: "#EF4444",
            secondary: "#F9FAFB",
          },
        },
      }}
    />
  </Provider>
);

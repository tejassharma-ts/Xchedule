import { StrictMode } from "react";

import { RouterProvider } from "react-router-dom";

import { createRoot } from "react-dom/client";

import "./index.css";

import { Toaster } from "sonner";

import router from "./router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster
      toastOptions={{
        className: "rounded-sm text-sm font-main border bg-secondary text-white border-transparent",
        classNames: {
          actionButton: `!rounded-none`,
        },
      }}
    />
  </StrictMode>,
);

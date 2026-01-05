import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/SignIn";
import AdminLayout from "./layouts/AdminLayout";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AdminDashboard from "./pages/AdminDashboard";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

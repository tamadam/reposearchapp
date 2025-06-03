import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./app/HomePage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import HistoryPage from "./app/HistoryPage";
import Page1Page from "./app/Page1Page";
import Page2Page from "./app/Page2Page";
import NotFoundPage from "./app/NotFoundPage";
import Layout from "./app/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/history", element: <HistoryPage /> },
      { path: "/page1", element: <Page1Page /> },
      { path: "/page2", element: <Page2Page /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

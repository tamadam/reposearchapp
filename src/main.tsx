import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
/* import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; */
import SearchPage from "./app/SearchPage";
import "react-resizable/css/styles.css";
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
      { path: "/", element: <SearchPage /> },
      { path: "/history", element: <HistoryPage /> },
      { path: "/page1", element: <Page1Page /> },
      { path: "/page2", element: <Page2Page /> },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>
);

import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { QueryProvider } from "../providers/QueryProvider";
import { ThemeProvider } from "../providers/ThemeProvider";
import { AppLayout } from "./components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { VideoDetailPage } from "./pages/VideoDetailPage";
import { CreatorPage } from "./pages/CreatorPage";
import { Toaster } from "./components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "video/:id", element: <VideoDetailPage /> },
      { path: "creator/:id", element: <CreatorPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

export default function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <div className="h-screen w-full bg-background text-foreground">
          <RouterProvider router={router} />
          <Toaster />
        </div>
      </QueryProvider>
    </ThemeProvider>
  );
}

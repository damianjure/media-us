import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./infrastructure/ui/AppLayout";
import { CalendarView } from "./infrastructure/ui/CalendarView";
import { MatrixView } from "./infrastructure/ui/MatrixView";
import { ServicesListView } from "./infrastructure/ui/ServicesListView";
import { PeopleView } from "./infrastructure/ui/PeopleView";
import { AuthScreen } from "./infrastructure/ui/AuthScreen";
import { ServiceDetailView } from "./infrastructure/ui/ServiceDetailView";
import { TeamManagementView } from "./infrastructure/ui/TeamManagementView";

const router = createBrowserRouter([
  { path: "/", element: <AuthScreen /> },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <CalendarView /> },
      { path: "matrix", element: <MatrixView /> },
      { path: "services", element: <ServicesListView /> },
      { path: "people", element: <PeopleView /> },
    ],
  },
  { path: "/service/:id", element: <ServiceDetailView /> },
  { path: "/teams", element: <TeamManagementView /> },
]);

export function App() {
  return <RouterProvider router={router} />;
}
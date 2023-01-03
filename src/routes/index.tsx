import { createBrowserRouter } from "react-router-dom";

import Home, {
  loader as rootLoader,
  action as rootAction,
} from "../components/home";

import ErrorElement from "../components/errors/homeError";
import ContactRoutes from "../components/contacts/routeConfig";
import ErrorPage from "../components/errors/homeError";
import RoleRoutes from "../components/role/routeConfig";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: rootLoader,
    action: rootAction,
    errorElement: <ErrorElement />,
    //pathless route
    children: [
      {
        errorElement: <ErrorPage />,
        children: ContactRoutes,
      },
      RoleRoutes,
    ],
  },
]);

export default router;

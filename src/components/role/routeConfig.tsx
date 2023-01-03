import { RouteObject } from "react-router-dom"
import Role from "."
import PTable from "../ptable";

const PATH_ROOT = "roles"

const RoleRoutes: RouteObject[] = [
  {
    path: `${PATH_ROOT}`,
    element: <Role />
  },
  {
    path: `${PATH_ROOT}/table`,
    element: <PTable />
  }

]

export default RoleRoutes;

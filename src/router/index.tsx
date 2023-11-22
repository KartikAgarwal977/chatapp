import { createBrowserRouter } from "react-router-dom";
import SignupForm from "../pages/login/SignupForm";
import Landing from "../pages/login";
import Room from "../pages/Room";
import ProtectedRoute from "./protectedRouter";
import Logout from "../pages/logout";

const router = createBrowserRouter([
  {
    path: "/signUp",
    element: <SignupForm />,
  },
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Room room={null} />
      </ProtectedRoute>
    ),
  },
]);
export default router;

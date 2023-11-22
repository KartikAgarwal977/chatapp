import { createBrowserRouter } from "react-router-dom";
import SignupForm from "../pages/login/SignupForm";
import Landing from "../pages/login";
import Room from "../pages/Room";
import ProtectedRoute from "./protectedRouter";
import Logout from "../pages/logout";
import Home from "../pages/home";
import PrivateRoomCreate from "../pages/createRoom";
import { Chat } from "../pages/chat";
import JoinPrivateRoom from "../pages/createRoom/joinRoom";
import { ChatPrivate } from "../pages/chat/private";

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
        <Home/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/room",
    element: (
      <ProtectedRoute>
        <Room />
      </ProtectedRoute>
    )
  },
  {
    path: "/privateRoom",
    element: (
      <ProtectedRoute>
        <PrivateRoomCreate/>
      </ProtectedRoute>
    )
  },
  {
    path: "/Chat/:name",
    element: (
      <ProtectedRoute>
        <Chat/>
      </ProtectedRoute>
    )
  },
  {
    path: "/PrivateChat/:name",
    element: (
      <ProtectedRoute>
        <ChatPrivate/>
      </ProtectedRoute>    )
  },
  {
    path: "/joinprivate",
    element: (
      <ProtectedRoute>
        <JoinPrivateRoom/>
      </ProtectedRoute>
    )
  }
]);
export default router;

import { useContext } from "react";
import { RoomDataContext } from "./context/RoomContext";
import { Analytics } from "@vercel/analytics/next"

import useSocket from "./hooks/socket/useSocket";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  const { isJoined } = useContext(RoomDataContext);
  useSocket(isJoined);
  return (
  <>
  <AppRoutes/>
  <Analytics/>
  </>
  );
}

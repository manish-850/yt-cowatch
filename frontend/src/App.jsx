import { Analytics } from "@vercel/analytics/react"
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
  <>
  <AppRoutes/>
  <Analytics/>
  </>
  );
}

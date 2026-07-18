import { Analytics } from "@vercel/analytics/react"
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
  <>
  <AppRoutes/>
  <Toaster/>
  <Analytics/>
  </>
  );
}

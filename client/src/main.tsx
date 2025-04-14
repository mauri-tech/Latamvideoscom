import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ResetCSS } from "./components/ui/ResetCSS";

createRoot(document.getElementById("root")!).render(
  <>
    <ResetCSS />
    <App />
  </>
);

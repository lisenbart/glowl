import { createRoot } from "react-dom/client";
import App from "./App";
import { initTheme } from "./lib/theme";
import "./styles/index.css";
import "./styles/theme-light.css";

initTheme();

createRoot(document.getElementById("root")!).render(<App />);

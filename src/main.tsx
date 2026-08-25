
  import { createRoot } from "react-dom/client";
  import { App } from "./app/App.tsx";
  import "./styles/index.css";

  // Browsers restore the previous scroll position on refresh by default. The
  // intro wall must always start at the top of the page (hero, statement 1) —
  // done here, at module scope, so it runs before the browser's own restore
  // logic rather than in a React effect (which fires too late, after mount).
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }

  createRoot(document.getElementById("root")!).render(<App />);

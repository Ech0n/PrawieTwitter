import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes.jsx";

function App() {
  return (
    <div id="app-container">
      
      <AppRoutes />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
export default App;

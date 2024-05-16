import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { SocketContextProvider } from "./Context/socketContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { GeminiProvider } from "./Context/GeminiContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GeminiProvider>
        <SocketContextProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </SocketContextProvider>
        </GeminiProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

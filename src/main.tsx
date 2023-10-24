import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App.tsx";
import AuthContextProvider from "./context/authContext.tsx";
import ChatsContextProvider from "./context/chatContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatsContextProvider>
        <App />
      </ChatsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

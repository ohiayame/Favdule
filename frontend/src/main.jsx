import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Modal from "react-modal";

Modal.setAppElement("#root");

if (!localStorage.getItem("groupData")) {
  localStorage.setItem(
    "groupData",
    JSON.stringify({
      0: [],
      1: [],
      2: [],
      3: [],
      groupsName: ["a", "b", "c", "d"],
    })
  );
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);

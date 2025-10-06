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
      groupsName: ["group1", "group2", "group3", "group4"],
    })
  );
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>
);

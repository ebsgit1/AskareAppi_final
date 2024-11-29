import React from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  // Ensure the portal renders to the correct DOM node
  const portalRoot = document.getElementById("portal-root");
  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;

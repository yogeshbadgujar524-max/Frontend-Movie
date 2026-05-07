// FooterWrapper.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

function FooterWrapper() {
  const location = useLocation();

  // Allowed paths where footer should be visible
  const visiblePaths = ["/", "/movies", "/contact"];

  // Check if current path matches one of them
  const shouldShowFooter = visiblePaths.includes(location.pathname.toLowerCase());

  return shouldShowFooter ? <Footer /> : null;
}

export default FooterWrapper;

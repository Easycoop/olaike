import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls to top of the page on route
 * @returns
 */
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // triggered on route change

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return null;
};

export default ScrollToTop;

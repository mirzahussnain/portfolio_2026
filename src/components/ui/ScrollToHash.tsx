import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHashElement = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        // We use a tiny timeout to ensure the browser has finished painting
        // This fixes the "click but don't move" bug
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }, 100);
      }
    }
  }, [hash]);

  return null;
};

export default ScrollToHashElement;

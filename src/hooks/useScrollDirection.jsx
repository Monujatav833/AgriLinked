import { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsHidden(currentScroll > lastScroll);
      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isHidden;
};

export default useScrollDirection;

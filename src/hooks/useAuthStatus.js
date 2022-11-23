import { useState, useEffect } from "react";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const message = localStorage.getItem("message") && JSON.parse(localStorage.getItem("message"));

  useEffect(() => {
    if (message) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [message]);

  return { loggedIn, checkingStatus };
};

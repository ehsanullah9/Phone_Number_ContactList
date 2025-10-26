import { useState, useEffect } from "react";
import MyNavbar from "@/components/navbar/Navbar";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const [isAuth, setIsAuth] = useState(false);

  // Check if the user is authenticated via /api/auth/status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth/status');
        if (res.status === 401) {
          setIsAuth(false);
        } else {
          setIsAuth(true);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuth(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      <MyNavbar isAuth={isAuth} setIsAuth={setIsAuth} />
      
      <Toaster position="top-right" reverseOrder={false} />

      <Component isAuth={isAuth} setIsAuth={setIsAuth} {...pageProps} />
    </>
  );
}

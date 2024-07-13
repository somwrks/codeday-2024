import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [usertype, setUsertype] = useState("");

  useEffect(() => {
    const storedUsertype = localStorage.getItem("usertype");
    if (storedUsertype) {
      setUsertype(storedUsertype);
    }
  }, []);

  const handleUserTypeChange = (newUserType) => {
    setUsertype(newUserType);
    localStorage.setItem("usertype", newUserType);
  };

  return (
    <ClerkProvider>
      <Component
        setUsertype={handleUserTypeChange}
        usertype={usertype}
        {...pageProps}
      />
    </ClerkProvider>
  );
}

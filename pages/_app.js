import "@/styles/globals.css";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [usertype, setUsertype] = useState("");
  useEffect(() => {
    const storedUsertype = localStorage.getItem("usertype");
    if (storedUsertype) {
      setUsertype(storedUsertype);
    }
  }, []);

  const handleUserTypeChange = async (newUserType) => {
    setUsertype(newUserType);
    localStorage.setItem("usertype", newUserType);
    
  };

  return (
    <ClerkProvider>
        <NextUIProvider>

      <Component
        setUsertype={handleUserTypeChange}
        usertype={usertype}
        {...pageProps}
      />
      </NextUIProvider>
    </ClerkProvider>
  );
}

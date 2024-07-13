import "@/styles/globals.css";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [usertype, setUsertype] = useState("");

  



  return (
    <ClerkProvider>
      <NextUIProvider>
        <Component
          usertype={usertype}
          setUsertype={setUsertype}
          {...pageProps}
        />
      </NextUIProvider>
    </ClerkProvider>
  );
}

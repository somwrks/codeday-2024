import "@/styles/globals.css";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function App({ Component, pageProps }) {
  const [usertype, setUsertype] = useState("");

  
  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const res = await fetch("/api/getuser");
        if (res.ok) {
          const data = await res.json();
          console.log(data);

          if (data?.user?.email) {
            setUsertype(data.user.type ?? "user"); // Set user type from data, defaulting to "user" if type is null
          } else {
            // If user array is empty, call postuser to create a new user
            await postUser();
          }
        } else {
          console.error("Failed to fetch user type:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, []);


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

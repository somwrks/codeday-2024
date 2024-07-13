// pages/index.js
import Navbar from "@/components/Navbar";
import NewsPage from "@/components/NewsPage";
import Topbar from "@/components/Topbar";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/router"; // Import useRouter
import { useEffect } from "react";

export default function Home({ usertype,setUsertype }) {
  const { user, isLoaded, isSignedIn } = useUser();
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

  const postUser = async () => {
    try {
      const res = await fetch("/api/postuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usertype: "user", 
          // Adjust this based on your logic for new user creation
          name: user.fullName,
          email: user.emailAddresses[0].emailAddress,
          type: "user",
        }),
      });

      if (res.ok) {
        console.log("New user created successfully");
        // Optionally, fetch user type again after creating user
      } else {
        console.error("Failed to create new user:", res.statusText);
      }
    } catch (error) {
      console.error("Error creating new user:", error);
    }
  };


  return (
    <>
      <SignedIn>
      <Topbar/>
        <div className="flex flex-col min-h-screen text-black">
         
          <NewsPage usertype={usertype} />
        </div>
        <Navbar />
      </SignedIn>
      <SignedOut>
        <div
          className="flex flex-col w-full space-y-4 min-h-screen bg-home"
        >
          <div
            className="flex absolute bottom-24 h-24 text-transparent text-7xl flex-col w-full"
          >
            <SignUpButton />
          </div>
        </div>
      </SignedOut>
    </>
  );
}

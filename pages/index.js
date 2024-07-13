import Navbar from "@/components/Navbar";
import NewsBlock from "@/components/NewsBlock";
import NewsPage from "@/components/NewsPage";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { useEffect } from "react";

export default function Home({ usertype, setUsertype }) {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      const name = user.fullName;
      const email = user.emailAddresses[0].emailAddress;

      fetch("/api/postuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          usertype,
        }),
      });
    }
    else{
      setUsertype("")
    }
  }, [user, usertype, isSignedIn,setUsertype]);

  return (
    <>
      <SignedIn>
        <div className="flex flex-col min-h-screen text-black">
          <div className="flex p-3 text-center text-black flex-col space-y-3 text-2xl">
            Welcome
            {isLoaded && isSignedIn && (
              <p>
                Name: {user.fullName}
                <br /> Email: {user.emailAddresses[0].emailAddress}
              </p>
            )}
            <br />
            You are a {usertype}
          </div>
          <NewsPage />
        </div>
        <Navbar />
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col w-full space-y-4 bg-white min-h-screen">
          <div className="flex flex-col p-4">
            <h1 className="text-4xl text-black text-center">InSafe</h1>
          </div>
          {["department", "user"].map((type) => (
            <div
              key={type}
              onClick={() => setUsertype(type)}
              className="flex flex-row gap-3 text-xl"
            >
              <div>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
              <div className="bg-black p-3 text-white">
                <SignInButton />
              </div>
            </div>
          ))}
        </div>
      </SignedOut>
    </>
  );
}

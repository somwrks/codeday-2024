import Image from "next/image";
import { Inter } from "next/font/google";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useUser,
} from "@clerk/nextjs";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ usertype, setUsertype }) {
  const { user, isLoaded, isSignedIn } = useUser();


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
          <div
            onClick={() => setUsertype("")}
            className="bg-black p-3 text-white"
          >
            <SignOutButton />
          </div>
        </div>
      </SignedIn>
      <SignedOut>
      
        <div className="flex flex-col w-full space-y-4   bg-white min-h-screen">
          <div className="flex flex-col p-4">
            <h1 className="text-4xl text-black text-center ">InSafe</h1>
          </div>
          <div  onClick={() => setUsertype("department")} className="flex flex-row gap-3 text-xl">
            <div>Department</div>
            <div
              
              className="bg-black p-3 text-white"
            >
              <SignInButton />
            </div>
          </div>
          <div onClick={() => setUsertype("user")} className="flex flex-row gap-3 text-xl">
            <div>User</div>
            <div
              
              className="bg-black p-3 text-white"
            >
              <SignInButton />
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
}

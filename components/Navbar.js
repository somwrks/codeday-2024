import { UserButton } from "@clerk/nextjs";
import { Link } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar() {
  const a = useRouter();
  return (
    <div className="flex justify-between z-50 fixed bottom-5 left-1/4 w-2/4  px-12 py-2 rounded-xl bg-black text-white">
      <Link href="/">
        <Image
          className={` ${a.pathname === "/" && "scale-125"}`}
          src={"/home.svg"}
          width={30}
          height={50}
          alt="home"
        />
      </Link>
      <Link href="/sos">
        <Image
          className={` ${a.pathname === "/sos" && "scale-125"}`}
          src={"/sos.svg"}
          width={30}
          height={50}
          alt="sos"
        />
      </Link>
      <UserButton />
    </div>
  );
}

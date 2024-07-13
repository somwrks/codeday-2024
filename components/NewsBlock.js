import { Skeleton } from "@nextui-org/skeleton";
import Image from "next/image";
import React from "react";

export default function NewsBlock({
  isLoaded,
  title,
  description,
  location,
  image,
  userid,
  usertype,
  date,
  time,
  sostype,
  status
}) {
  const handledispatch = async()=>{
    console.log(userid)
    const res = await fetch("/api/postunits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId:userid
      }),
    });
    if (res.ok) {
      alert("Units dispatched")
    } else {
      console.error("Failed to update user type:", res.statusText);
    }
  }
  return (
    <div className="flex flex-row p-2 w-full">
      <Skeleton isLoaded={isLoaded} className="rounded-lg">
        <div className="flex flex-col ">
          <Image
            src={image ? image : "/vercel.svg"}
            width={300}
            height={300}
            alt="Image"
          />
        </div>
      </Skeleton>
      <div className="flex space-y-2 flex-col w-full p-2">
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <h1 className="text-2xl font-semibold">{title}</h1>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <p className="text-xl">{description}</p>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <h3 className="text-md">{location}</h3>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <h4 className="text-md">{date}</h4>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <h5 className="text-md">{time}</h5>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
        {status==0 && usertype ==="department" && 
 <button className="text-xl text-white bg-black p-3 rounded-xl" onClick={handledispatch}>Dispatch</button>
        }
        </Skeleton>
      </div>
    </div>
  );
}

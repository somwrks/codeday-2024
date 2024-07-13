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
        <div className="flex flex-col w-1/2">
          <Image
            src={image ? image : "/vercel.svg"}
            width={200}
            height={200}
            alt="Image"
          />
        </div>
      </Skeleton>
      <div className="flex space-y-2 flex-col p-2">
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <h1>{title}</h1>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <p>{description}</p>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <h3>{location}</h3>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <h4>{date}</h4>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <h5>{time}</h5>
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

import { Skeleton } from "@nextui-org/skeleton";
import Image from "next/image";
import React from "react";

export default function NewsBlock({
  isLoaded,
  title,
  description,
  location,
  image,
  date,
  time,
}) {
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
      </div>
    </div>
  );
}

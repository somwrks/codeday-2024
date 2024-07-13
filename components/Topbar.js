import Image from "next/image";
import React from "react";

export default function Topbar({usertype}) {
  return (
    <div className="flex flex-col gap-5 p-3 w-full">

    <div className="flex text-xl flex-row  w-full justify-between p-2">
      <div className="flex"></div>
      <div className="flex flex-row gap-2">
        <Image src={"/marker-icon.svg"} width={20} height={20} alt="Map" />
        <h1>{usertype=="user" ? "Lucknow" : "DEPARTMENT"}</h1>
      </div>
      <div className="flex">

        <Image src={"/icon.svg"} width={20} height={20} alt="Map" />
      </div>
    </div>
    <div className="flex gap-2 p-4 rounded-full flex-col w-full">
    <div className="flex flex-row border shadow-sm gap-2 p-2 rounded-full">
    <Image src={"/search.svg"} width={30} height={30} alt="Search"/>
    <input type="text" placeholder="Search some heroes" className="flex p-2 border-none focus:no-underline   w-full flex-col"/>
    <button className="py-2 px-4 text-white bg-gradient-to-r from-[#0F262C] to-[#327E92] rounded-full ">Search</button>
    </div>
    </div>
    <div className="flex flex-col w-full h-64 bg-drake"></div>
    </div>
  );
}

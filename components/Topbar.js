import Image from "next/image";
import React from "react";

export default function Topbar() {
  return (
    <div className="flex text-xl flex-row  w-full justify-between p-2">
      <div className="flex"></div>
      <div className="flex flex-row gap-2">
        <Image src={"/marker-icon.svg"} width={20} height={20} alt="Map" />
        <h1>Lucknow</h1>
      </div>
      <div className="flex">

        <Image src={"/icon.svg"} width={20} height={20} alt="Map" />
      </div>
    </div>
  );
}

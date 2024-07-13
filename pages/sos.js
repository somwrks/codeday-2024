// pages/sos.js
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import React, { useState } from "react";

const Navigate = dynamic(() => import("../components/Navigate"), {
  ssr: false,
});

export default function SOS({usertype}) {
  const [location, setLocation] = useState("")
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newsData = {
      location: location,
      image: "",
      description,
      title,
    };

    try {
      const response = await fetch("/api/postnews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      if (response.ok) {
        console.log("News posted successfully");
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to post news");
      }
    } catch (error) {
      console.error("Error posting news:", error);
    }
  };

  return (
    <>
    {usertype ==="department" ?"" 
: 
    <>
      <div style={{ position: "relative", width: "100vw", height: "95vh" }}>
        <Navigate
          handleSubmit={handleSubmit}
          setDescription={setDescription}
          description={description}
          setLocation={setLocation}
          title={title}
          setTitle={setTitle}
        />
      </div>
      <Navbar />
    </>

    }
    </>
  );
}

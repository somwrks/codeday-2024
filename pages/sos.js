// pages/sos.js
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Navigate = dynamic(() => import("../components/Navigate"), {
  ssr: false,
});
const MapContainer = dynamic(() => import("../components/MapContainer"), {
  ssr: false,
});

export default function SOS({ usertype }) {
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prompt, setPrompt] = useState(true);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNewsLocations = async () => {
      try {
        const response = await fetch("/api/getnews");

        if (response.ok) {
          const data = await response.json();
          console.log("Data:", data);
          setNews(data.news);

        } else {
          console.error("Failed to fetch news locations");
        }
      } catch (error) {
        console.error("Error fetching news locations:", error);
      }
    };

    fetchNewsLocations();
  }, []);
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
        setPrompt(true);
        alert("Waiting for dispatch");
        setTimeout(() => {
          setPrompt(false);
        }, 5000);
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
      {usertype === "department" ? (
        <div style={{ position: "relative",zIndex: 0 , width: "100vw", height: "100vh" }}>
        <MapContainer  news={news} />
        </div>
      ) : (
        <>
          <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <Navigate
              handleSubmit={handleSubmit}
              setDescription={setDescription}
              description={description}
              setPrompt={setPrompt}
              usertype={usertype}
              setLocation={setLocation}
              title={title}
              setTitle={setTitle}
            />
          </div>
        </>
      )}
          <Navbar />
    </>
  );
}

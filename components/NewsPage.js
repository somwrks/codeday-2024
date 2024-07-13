import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import NewsBlock from "./NewsBlock";

export default function NewsPage({ usertype }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState([]);
  const [filtersostype, setFiltersostype] = useState("All");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/api/getnews", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const { news } = await res.json();
          console.log("news : ",news)
          if (news) {
            setNews(news);
            setIsLoaded(true);
          }
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    const delay = 1000; // Delay in milliseconds
    const timer = setTimeout(fetchNews, delay);
    
    return () => clearTimeout(timer);
    }, [filtersostype,setFiltersostype]);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner color="primary" />
      </div>
    );
  }
  const filters = ["All", "Fire", "Accident", "Assault", "Theft", "Emerge"];
  return (
    <div className="flex p-4 gap-3 flex-col">
      <h1 className="text-4xl">Latest News</h1>
      <div className="flex flex-row  gap-2">
        {filters.map((e) => (
          <div
            key={e}
            onClick={() => setFiltersostype(e)}
            className={`flex cursor-pointer flex-col py-2  rounded-full
            px-4 text-md ${
              filtersostype == e ? "bg-purple-900 text-white" : "text-gray-600"
            }`}
          >
            {e}
          </div>
        ))}
      </div>
      { usertype ==="department"? news.length > 0 ? (
        news.map((e, i) =>
          filtersostype != "All" ? e.title == filtersostype ? (
            <>
            <NewsBlock
              usertype={usertype}
              key={i}
              status={e.status}
              userid={e.userid}
              isLoaded={isLoaded}
              title={e.title}
              sostype={e.sostype}
              description={e.description}
              location={e.location}
              image={e.image}
              date={e.date}
              time={e.time}
            />
            </>

          ):<div className="flex flex-col w-full items-center mt-32 h-56">
          <p>No News Available</p>
        </div> : (
            <NewsBlock
              usertype={usertype}
              key={i}
              status={e.status}
              userid={e.userid}
              isLoaded={isLoaded}
              title={e.title}
              sostype={e.sostype}
              description={e.description}
              location={e.location}
              image={e.image}
              date={e.date}
              time={e.time}
            />
          )
        )
      ) : (
        <div className="flex flex-col w-full items-center mt-32 h-56">
          <p>No News Available</p>
        </div>
      ): <div className="flex flex-col w-full h-96 bg-articles"></div>}
    </div>
  );
}

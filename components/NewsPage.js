import React, { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";
import NewsBlock from "./NewsBlock";

export default function NewsPage({usertype}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [news, setNews] = useState([]);

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
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
      <Spinner color="primary"/>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {news.length > 0 ? (
        news.map((e, i) => (
          <NewsBlock
          usertype={usertype}
            key={i}
            status={e.status}
            userid = {e.userid}
            isLoaded={isLoaded}
            title={e.title}
            description={e.description}
            location={e.location}
            image={e.image}
            date={e.date}
            time={e.time}
          />
        ))
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
}
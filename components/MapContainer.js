// components/MapContainer.js
import { useEffect } from "react";
import { MapContainer as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

const MapContainer = ({ news }) => {
  useEffect(() => {
    console.log("News:", news); // For debugging
  }, [news]);

  return (
    <LeafletMap center={[0, 0]} zoom={2} style={{ width: "100%", height: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {news.map((item, index) => (
        <Marker key={index} position={parseLocation(item.location)}>
          <Popup>{`${item.userid} - ${item.newsid}`}</Popup>
        </Marker>
      ))}
    </LeafletMap>
  );
};

// Function to parse location string or array
const parseLocation = (location) => {
  try {
    const parsed = JSON.parse(location);
    if (Array.isArray(parsed) && parsed.length === 2) {
      return parsed;
    }
    return [0, 0]; // Default position if parsing fails
  } catch (error) {
    console.error("Error parsing location:", error);
    return [0, 0]; // Default position if parsing fails
  }
};

export default MapContainer;

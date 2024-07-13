// components/Navigate.js
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import marker images
import markerIcon from "../public/marker-icon.svg";
import markerIcon2x from "../public/marker-icon-2x.svg";
import markerShadow from "../public/marker-shadow.svg";

// Set default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

function SetViewToUser({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (map && coords) {
      map.setView(coords, map.getZoom());
    }
  }, [map, coords]);
  return null;
}

export default function Navigate({
  description,
  handleSubmit,
  title,
  setDescription,
  setTitle,
  setLocation,
}) {
  const [userPosition, setUserPosition] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    async function checkUnits() {
      try {
        const response = await fetch("/api/getunits");
        const data = await response.json();
        if (!data.units.status) {
          setFormVisible(true);
        } else {
          setFormVisible(false);
        }
      } catch (error) {
        console.error("Error fetching units:", error);
        setFormVisible(true);
      }
    }
    checkUnits();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          setLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  if (!userPosition) {
    return <div>Loading map...</div>;
  }

  return (
    <>
      {formVisible ? (
        <div
          style={{
            position: "fixed",
            zIndex: 999,
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div
          style={{
            position: "fixed",
            zIndex: 999,
            top: "20%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          Help is on the way!
        </div>
      )}
      <MapContainer
        center={userPosition}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={userPosition} />
        <SetViewToUser coords={userPosition} />
      </MapContainer>
    </>
  );
}

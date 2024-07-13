import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import markerIcon from "../public/marker-icon.svg";
import markerIcon2x from "../public/marker-icon-2x.svg";
import markerShadow from "../public/marker-shadow.svg";

// Set default marker icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

// Custom icon for the cara
const carIcon = new L.Icon({
  iconUrl: "car.png",
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
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
  setPrompt,
  setLocation,
}) {
  const [userPosition, setUserPosition] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [secondaryPosition, setSecondaryPosition] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  useEffect(() => {
    async function checkUnits() {
      try {
        const response = await fetch("/api/getunits");
        const data = await response.json();
        if (!data.units.status) {
          setFormVisible(true);
          
        } else {
          setFormVisible(false);
          setPrompt(false)
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
          const userCoords = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserPosition(userCoords);
          setLocation(userCoords);

          if (!formVisible) {
            const randomOffset = () => {
              const minDistance = 0.01; // Minimum distance in degrees (approx. 1.1 km)
              const maxDistance = 0.02; // Maximum distance in degrees (approx. 2.2 km)
              const distance =
                minDistance +
                Math.random() * (maxDistance - minDistance);
              const angle = Math.random() * 2 * Math.PI;
              const offsetX = distance * Math.cos(angle);
              const offsetY = distance * Math.sin(angle);
              return [offsetX, offsetY];
            };

            const [offsetLat, offsetLng] = randomOffset();
            const secondaryCoords = [
              userCoords[0] + offsetLat,
              userCoords[1] + offsetLng,
            ];
            setSecondaryPosition(secondaryCoords);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, [formVisible]);

  useEffect(() => {
    if (userPosition && secondaryPosition) {
      const map = L.map("map");

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      const userMarker = L.marker(userPosition).addTo(map);
      const secondaryMarker = L.marker(secondaryPosition, {
        icon: carIcon,
      }).addTo(map);

      L.Routing.control({
        waypoints: [
          L.latLng(userPosition[0], userPosition[1]),
          L.latLng(secondaryPosition[0], secondaryPosition[1]),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: "#007AFF", opacity: 0.8, weight: 5 }],
        },
        show: false, // Hide the route initially
        createMarker: function () {
          return null; // Disable default markers
        },
        router: new L.Routing.OSRMv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),
      })
        .on("routesfound", function (e) {
          const routes = e.routes;
          if (routes.length > 0) {
            const route = routes[0];
            const duration = route.summary.totalTime / 60; // Convert seconds to minutes
            setEstimatedTime(Math.ceil(duration));
          }
        })
        .addTo(map);

      return () => {
        map.remove();
      };
    }
  }, [userPosition, secondaryPosition]);

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
          {estimatedTime && (
            <p>Arriving in {estimatedTime} minutes!</p>
          )}
        </div>
      )}
      
      <div id="map" style={{ zIndex:0, width: "100%", height: "100vh" }}></div>
    </>
  );
}


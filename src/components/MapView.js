// MapView.js
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import Markers from "./VenueMarkers";
import DriverList from "./DriverList";
import UserMarker from "./UserMarker";

import data from "../assets/data.json";

import "leaflet/dist/leaflet.css";
import "./MapView.css";

const MAP_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const POSITION_DEFAULT = [-34.61315, -58.37723];

const MapView = () => {
  const { venues, drivers } = data;

  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      });
    }
  }, []);

  return (
    <div className="map-view-container">
      <div className="map-container">
        <MapContainer
          center={userPosition || POSITION_DEFAULT}
          zoom={13}
          style={{ height: "100vh", width: "100wh" }}
        >
          <TileLayer url={MAP_URL} attribution={ATTRIBUTION} />
          <Markers venues={venues} drivers={drivers} />
          <UserMarker userPosition={userPosition} />
        </MapContainer>
      </div>
      <div className="driver-list">
        <DriverList drivers={drivers} />
      </div>
    </div>
  );
};

export default MapView;

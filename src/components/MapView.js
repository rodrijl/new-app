// MapView.js
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { assignVenue } from "../redux/slice";
import data from "../assets/data.json";
import Markers from "./VenueMarkers";
import DriverList from "./DriverList";

import "leaflet/dist/leaflet.css";
import "./MapView.css";

const MapView = () => {

  const {venues, drivers} = data

  const dispatch = useDispatch();

  const handleAssignVenue = (venueName, driverName) => {
    dispatch(assignVenue({ venueName, driverName }));
  };

  const position = [52.52437, 13.41053];

  return (
    <div className="map-view-container">
      <div className="map-container">
        <MapContainer center={position} zoom={11} style={{ height: "100vh", width: "100wh" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Markers
            venues={venues}
            drivers={drivers}
          />
        </MapContainer>
      </div>
      <div className="driver-list">
        <DriverList drivers={data.drivers} assignVenue={handleAssignVenue} />
      </div>
    </div>
  );
};

export default MapView;

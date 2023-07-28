import React, { useState } from "react";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

import { useDispatch, useSelector } from "react-redux";
import { assignVenue } from "../redux/slice";

import { getAssignedPlaces } from "../utils/getAssignedPlaces";

import marker from "../assets/venue_location_icon.svg";

const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});

const VenueMarkers = (props) => {
  const { venues, drivers } = props;
  const dispatch = useDispatch();

  const assignedDelivery = useSelector((state) => state.venues.assignedPoints);

  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleAssignVenue = (venueName) => {
    if (selectedDriver) {
      const selectedDriverData = drivers.find(
        (driver) => driver.id === parseInt(selectedDriver)
      );
      if (selectedDriverData) {
        const assignedPlaces = getAssignedPlaces(
          assignedDelivery,
          selectedDriverData
        );
        if (assignedPlaces.length >= 5) {
          alert("You cannot assign any more locations to this driver.");
          return;
        }
        dispatch(
          assignVenue({ venueName, driverName: selectedDriverData.name })
        );
        setSelectedDriver(null);
      }
    }
  };

  const markers = venues.map((venue) => (
    <Marker key={venue.name} position={venue.geometry} icon={myIcon}>
      <Popup>
        <div>
          <p>Name: {venue.name}</p>
          <p>Description: {venue.description}</p>
          {assignedDelivery[venue.name] ? (
            <div>
              <p>Assigned to: {assignedDelivery[venue.name]}</p>
            </div>
          ) : (
            <div>
              <p>Not assigned</p>
              <select
                value={selectedDriver || ""}
                onChange={(e) => setSelectedDriver(e.target.value)}
              >
                <option value="">Select Driver</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
              <button onClick={() => handleAssignVenue(venue.name)}>
                Assign Driver
              </button>
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  ));

  return <>{markers}</>;
};

export default VenueMarkers;

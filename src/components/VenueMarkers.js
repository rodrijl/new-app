import React, { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { VenueLocationIcon } from "./VenueLocationIcon";
import { assignVenue } from "../redux/slice";
import { getAssignedPlaces } from "../utils/getAssignedPlaces";

const VenueMarkers = (props) => {
  const { venues,  drivers } = props;
  const dispatch = useDispatch();

  const assignedDelivery = useSelector((state) => state.venues.assignedPoints);

  const [selectedDriver, setSelectedDriver] = useState(null);


  const handleAssignVenue = (venueName) => {
    if (selectedDriver) {
      const selectedDriverData = drivers.find((driver) => driver.id === parseInt(selectedDriver));
      if (selectedDriverData) {
        const assignedPlaces = getAssignedPlaces(assignedDelivery, selectedDriverData);
        if (assignedPlaces.length >= 5) {
          alert('No se le puede asignar más lugares a este chofer.');
          return;
        }
        dispatch(assignVenue({ venueName, driverName: selectedDriverData.name }));
        setSelectedDriver(null);
      }
    }
  };

  const markers = venues.map((venue) => (
    <Marker
      key={venue.name}
      position={venue.geometry}
      icon={VenueLocationIcon}
    >
      <Popup
      >
        <div>
          <p>Nombre del punto: {venue.name}</p>
          <p>Descripción: {venue.description}</p>
          {assignedDelivery[venue.name] ? (
            <div>
              <p>Asignado a: {assignedDelivery[venue.name]}</p>
            </div>
          ) : (
            <div>
              <p>No asignado</p>
              <select value={selectedDriver || ""} onChange={(e) => setSelectedDriver(e.target.value)}>
                <option value="">Seleccionar chofer</option>
                {drivers.map((driver) => (
                  <option key={driver.id} value={driver.id}>
                    {driver.name}
                  </option>
                ))}
              </select>
              <button onClick={() => handleAssignVenue(venue.name)}>Asignar a un chofer</button>
            </div>
          )}
        </div>
      </Popup>
    </Marker>
  ));

  return <>{markers}</>;
};

export default VenueMarkers;

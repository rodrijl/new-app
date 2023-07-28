import React from "react";

import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import marker from "../assets/user_location_icon.svg";

const myIcon = new L.Icon({
  iconUrl: marker,
  iconRetinaUrl: marker,
  popupAnchor: [-0, -0],
  iconSize: [32, 45],
});

const UserMarker = ({ userPosition }) => {
  return (
    <>
      {userPosition && (
        <Marker position={userPosition} icon={myIcon}>
          <Popup>
            <div>
              <p>Current position</p>
            </div>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default UserMarker;

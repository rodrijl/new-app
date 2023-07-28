import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getAssignedPlaces } from "../utils/getAssignedPlaces";

import "./DriverList.css";


const DriverList = ({ drivers }) => {
  const assignedPlace = useSelector((state) => state.venues.assignedPoints);

  const [updatedDrivers, setUpdatedDrivers] = useState([]);

  useEffect(() => {
    const updatedDrivers = drivers.map((driver) => {
      const assignedPlaces = getAssignedPlaces(assignedPlace, driver);
      return {
        ...driver,
        assignedPlaces,
      };
    });
    setUpdatedDrivers(updatedDrivers);
  }, [assignedPlace, drivers]);

  const getDriverColor = (assignedPlaces) => {
    if (!assignedPlaces || assignedPlaces.length === 0) {
      return "green";
    } else if (assignedPlaces.length <= 4) {
      return "yellow bounce";
    } else {
      return "red flash";
    }
  };

  return (
    <div className="driver-list">
      <h2>Drivers List</h2>
      <ul>
        {updatedDrivers.map((driver) => {
          const driverColor = getDriverColor(driver.assignedPlaces);
          return (
            <li key={driver.id} className={driverColor}>
              {driver.name}
              <p>
                Places assigned:{" "}
                {driver.assignedPlaces && driver.assignedPlaces.length > 0
                  ? driver.assignedPlaces.join(", ")
                  : "No places assigned"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DriverList;

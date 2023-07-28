export const getAssignedPlaces = (assignedPlace, driver) => {
    const assignedPlaces = [];
    for (const place in assignedPlace) {
      if (assignedPlace[place] === driver.name) {
        assignedPlaces.push(place);
      }
    }
    return assignedPlaces;
  };
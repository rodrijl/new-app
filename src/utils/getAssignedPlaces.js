export const getAssignedPlaces = (assignedPlace, driver) => {
  return Object.keys(assignedPlace).reduce((assignedPlaces, place) => {
    if (assignedPlace[place] === driver.name) {
      assignedPlaces.push(place);
    }
    return assignedPlaces;
  }, []);
};

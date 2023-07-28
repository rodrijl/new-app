import { createSlice } from "@reduxjs/toolkit";

const venueSlice = createSlice({
  name: "venues",
  initialState: {
    assignedPoints: {},
  },
  reducers: {
    assignVenue(state, action) {
      const { venueName, driverName } = action.payload;
      if (!driverName) {
        const updatedPoints = { ...state.assignedPoints };
        delete updatedPoints[venueName];
        state.assignedPoints = updatedPoints;
      } else {
        state.assignedPoints = {
          ...state.assignedPoints,
          [venueName]: driverName,
        };
      }
    },
  },
});

export const { assignVenue } = venueSlice.actions;
export default venueSlice.reducer;

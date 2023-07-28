import React from "react";
import "./App.css";

import store from "./redux/store";
import { Provider } from "react-redux";

import MapView from "./components/MapView";

function App() {
  return (
    <Provider store={store}>
      <MapView />
    </Provider>
  );
}

export default App;

import React from "react";

import Players from "./containers/Players/Players";
import PlayerForm from "./containers/PlayerForm/PlayerForm";

import "./App.css";
export default function App() {
  return (
    <div className="App">
      <div className="layout">
        <div className="column-1">
          <PlayerForm />
        </div>
        <div className="column-2">
          <Players />
        </div>
      </div>
    </div>
  );
}

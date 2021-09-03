import { useEffect, useState } from "react"
import './App.scss';
import RecipeGrid from "./components/RecipeGrid";
import UserCP from "./components/UserCP";

function App() {
  return (
    // will need some kind of login components

    <div className="App">
      <div id="outer-container">
        <UserCP />
        <RecipeGrid />
      </div>
    </div>
  );
}

export default App;

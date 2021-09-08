import { useState } from "react"
import './App.scss';
import RecipeGrid from "./components/RecipeGrid";
import UserCP from "./components/UserCP";

function App() {
  const [sortRecipes, setSortRecipes] = useState("asc")

  return (
    // will need some kind of login components

    <div className="App">
      <div id="outer-container">
        <UserCP setSortRecipes={setSortRecipes} sortRecipes={sortRecipes}/>
        <RecipeGrid sortRecipes={sortRecipes}/>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect, useRef } from "react"
import './App.scss';
import RecipeGrid from "./components/RecipeGrid";
import UserCP from "./components/UserCP";
import { touchStart, touchMove, touchEnd, setDragged  } from "./functions/touchFunctions"

function App() {
  const [sortRecipes, setSortRecipes] = useState("asc")
  const dragged = useRef(false)

  useEffect(() => {
      window.addEventListener('mousedown', touchStart)

      window.addEventListener('mousemove', touchMove)

      window.addEventListener('mouseup', () => {
        dragged.current = setDragged()
        touchEnd()
      })
      
      return () => {
          window.removeEventListener('mousedown', touchStart)
          window.removeEventListener('mousemove', touchMove)
          window.removeEventListener('mouseup', touchEnd)
      }
  }, [])

  return (
    // will need some kind of login components

    <div className="App">
      <div id="outer-container">
        <UserCP setSortRecipes={setSortRecipes} sortRecipes={sortRecipes}/>
        <RecipeGrid sortRecipes={sortRecipes} dragged={dragged}/>
      </div>
    </div>
  );
}

export default App;

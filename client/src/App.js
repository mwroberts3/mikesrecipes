import { useState, useEffect } from "react"
import './App.scss';
import RecipeGrid from "./components/RecipeGrid";
import UserCP from "./components/UserCP";

function App() {
  const [sortRecipes, setSortRecipes] = useState("asc")

  let isDragging = false,
    startPos = 0,
    currentTranslate = 0,
    prevTranslate = 0,
    animationID = 0,
    selectedCard = ''

  const touchStart = (e) => {
    console.log('mouse down', e.target.parentNode)
    isDragging = true
    startPos = e.pageX

    if (e.target.tagName === "P") {
      selectedCard = e.target.parentNode
      animationID = requestAnimationFrame(animation)
    }
  }

  const touchMove = (e) => {
    if (isDragging) {
      currentTranslate = e.pageX - startPos

      console.log(currentTranslate)
    }
  }

  const touchEnd = () => {
    isDragging = false
    cancelAnimationFrame(animationID)
    selectedCard.style.transform = `translateX(${-currentTranslate}px)`
    currentTranslate = 0
  }

  const animation = () => {
    if (currentTranslate < 0) {
      selectedCard.style.transform = `translateX(${currentTranslate}px)`
    }

    if (isDragging) {
      requestAnimationFrame(animation)
    }
  }

  useEffect(() => {
      window.addEventListener('mousedown', touchStart)

      window.addEventListener('mousemove', touchMove)

      window.addEventListener('mouseup', touchEnd)
      
      return () => {
          window.removeEventListener('mousedown', touchStart)
      }
  }, [])

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

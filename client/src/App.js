import { useState, useEffect, useRef } from "react"
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

  const dragged = useRef(false)

  const touchStart = (e) => {
    console.log('touch started', e.pageX, e.target.textContent)

    isDragging = true
    startPos = e.pageX

    if (e.target.tagName === "P") {
      selectedCard = e.target.parentNode
      animationID = requestAnimationFrame(animation)
    }
  }

  const touchMove = (e) => {
    if (isDragging) {
      currentTranslate = prevTranslate + e.pageX - startPos
      console.log(currentTranslate)
    } 

    if (currentTranslate <= -40) {
      currentTranslate = -50
    } 

    if (currentTranslate > 0) {
      currentTranslate = 0
    }
  }
  
  const touchEnd = () => {
    isDragging = false
    cancelAnimationFrame(animationID)
    prevTranslate = currentTranslate
    
    if (currentTranslate > -40) {
      currentTranslate = 0
      prevTranslate = 0
    }
    // selectedCard.style.transform = `translateX(0px)`

    // need to distinguish between the different cards and only have the prevTranslate/currentTranslate carry over if it's the same card being clicked

    // maybe it base it on recipe name, store the previous name in a temp variable and compare the current clicked name to the previous one

    console.log(prevTranslate, currentTranslate)
    
    dragged.current = true
  }

  const animation = () => {
    selectedCard.style.transform = `translateX(${currentTranslate}px)`
    
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

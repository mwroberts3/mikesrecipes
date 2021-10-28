import { useState, useEffect, useRef} from "react"
import './App.scss';
import { touchStart, touchMove, touchEnd, setDragged  } from "./functions/touchFunctions"
import { hideRecipeGrid, showRecipeGrid } from "./functions/helperFunctions"
import RecipeGrid from "./components/RecipeGrid";
import UserCP from "./components/UserCP";
import Login from "./components/Login";
import Footer from "./components/Footer";

import firebase from 'firebase'

function App() {
  const [sortRecipes, setSortRecipes] = useState("asc")
  const dragged = useRef(false)
  const multiList = useRef([])
  const [multiListView, setMultiListView] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [addingRecipe, setAddingRecipe] = useState(false)

  const [loggedIn, setLoggedIn] = useState(null)

  const [isUserSignedIn, setIsUserSignedIn] = useState(true)

  firebase.auth().onAuthStateChanged((user) => {  
    if (user) {
      setLoggedIn(user.bc.email)
      return setIsUserSignedIn(true)
    } else {
      setIsUserSignedIn(false)
    }
  })

  useEffect(() => {
      window.addEventListener('touchstart', touchStart)

      window.addEventListener('touchmove', touchMove)

      window.addEventListener('touchend', () => {
        dragged.current = setDragged()
        touchEnd()
      })

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

  const showIngredientList = (e, recipe) => {
    if (!dragged.current) {
        hideRecipeGrid()

        let tempIngredientList = []
        for (let i=0; i<recipe.ingredients.length; i++) {
            tempIngredientList.push(recipe.ingredients[i].item)
        }
        setSelectedIngredients(tempIngredientList)
    }
}

  const addNewRecipe = () => {
    let newRecipeInfo = Array.from(document.querySelectorAll('input'))

    let requestReadyRecipeObj = {}
    let ingredientSublist = []

    for(let i=0;i<newRecipeInfo.length;i++) {
      if (i===0) {
        requestReadyRecipeObj.dish = newRecipeInfo[i].value
      } else {
        if (newRecipeInfo[i].value !== "") {
          ingredientSublist.push({"item":newRecipeInfo[i].value})
        }
      }
    }

    // clear values
    for(let i=0;i<newRecipeInfo.length;i++) {
      newRecipeInfo[i].value = ''
    }
    
    requestReadyRecipeObj.ingredients = ingredientSublist

    requestReadyRecipeObj.userHash = loggedIn

    requestReadyRecipeObj = JSON.stringify(requestReadyRecipeObj)

    fetch("/add-recipe", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: requestReadyRecipeObj
    })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))

      setAddingRecipe(false)
    }
  
  const showAddRecipeForm = () => {
    if (!addingRecipe) {
      hideRecipeGrid()
    } else if (addingRecipe){
      showRecipeGrid()
    }
    setAddingRecipe(!addingRecipe)
  }

  return (
    // will need some kind of login components
    <div className="App">
      {isUserSignedIn === true ?  
      <div id="outer-container">
        <UserCP setSortRecipes={setSortRecipes} sortRecipes={sortRecipes} multiList={multiList} setMultiListView={setMultiListView} setSelectedIngredients={setSelectedIngredients} showAddRecipeForm={showAddRecipeForm} setLoggedIn={setLoggedIn}/>
          <RecipeGrid 
            sortRecipes={sortRecipes} 
            dragged={dragged} 
            multiList={multiList} 
            multiListView={multiListView} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} 
            showIngredientList={showIngredientList} addingRecipe={addingRecipe} 
            setAddingRecipe={setAddingRecipe}
            addNewRecipe={addNewRecipe} 
            showRecipeGrid={showRecipeGrid}
            loggedIn={loggedIn}/> 
        <Footer />
      </div> 
      : 
      <div id="login-signup-screen">
        <div><h2 className="header-font">Mike's Recipes</h2></div>
        <Login setLoggedIn={setLoggedIn}/>
        <Footer />
      </div>
      }   
    </div>
  );
}

export default App;

import { useState, useEffect, useRef} from "react"
import './App.scss';
import RecipeGrid from "./components/RecipeGrid";
import UserCP from "./components/UserCP";
import { touchStart, touchMove, touchEnd, setDragged  } from "./functions/touchFunctions"
import firebase from "./firebase"

function App() {
  let provider = new firebase.auth.GoogleAuthProvider()

  console.log(provider)

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    let credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    let token = credential.accessToken;
    // The signed-in user info.
    let user = result.user;
    console.log(user)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // The email of the user's account used.
    let email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    let credential = error.credential;
    // ...
  });

  const [sortRecipes, setSortRecipes] = useState("asc")
  const dragged = useRef(false)
  const multiList = useRef([])
  const [multiListView, setMultiListView] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [addingRecipe, setAddingRecipe] = useState(false)

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
    let newRecipeID = Math.floor(Math.random() * 9999)

    for(let i=0;i<newRecipeInfo.length;i++) {
      if (i===0) {
        requestReadyRecipeObj.dish = newRecipeInfo[i].value
        requestReadyRecipeObj.id = newRecipeID
      } else {
        if (newRecipeInfo[i].value !== "") {
          ingredientSublist.push({"item":newRecipeInfo[i].value, "id":newRecipeID})
        }
      }
    }

    // clear values
    for(let i=0;i<newRecipeInfo.length;i++) {
      newRecipeInfo[i].value = ''
    }
    
    requestReadyRecipeObj.ingredients = ingredientSublist

    requestReadyRecipeObj = JSON.stringify(requestReadyRecipeObj)
    
    console.log(requestReadyRecipeObj)

    fetch("/recipes", {
      method: 'POST',
      headers: {
        "Content-type": "application/json"
      },
      body: requestReadyRecipeObj
    })
      .then((res) => console.log(res))
      .then(() => {
        setAddingRecipe(false)
      })
        .catch((err) => console.log(err))    
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
      <div id="outer-container">
        <UserCP setSortRecipes={setSortRecipes} sortRecipes={sortRecipes} multiList={multiList} setMultiListView={setMultiListView} setSelectedIngredients={setSelectedIngredients} showAddRecipeForm={showAddRecipeForm}/>
        <RecipeGrid 
          sortRecipes={sortRecipes} 
          dragged={dragged} 
          multiList={multiList} 
          multiListView={multiListView} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} 
          showIngredientList={showIngredientList} addingRecipe={addingRecipe} 
          setAddingRecipe={setAddingRecipe}
          addNewRecipe={addNewRecipe} 
          showRecipeGrid={showRecipeGrid}/>
      </div>
    </div>
  );


  // helper functions
  function hideRecipeGrid() {
    document.getElementById("recipe-grid").classList.add('hide-recipe-grid')
  }

  function showRecipeGrid() {
    document.getElementById("recipe-grid").classList.remove('hide-recipe-grid')
  }
}

export default App;

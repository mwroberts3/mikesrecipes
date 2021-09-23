import { useState, useEffect, useRef} from "react"
import './App.scss';
import RecipeGrid from "./components/RecipeGrid";
import UserCP from "./components/UserCP";
import { touchStart, touchMove, touchEnd, setDragged  } from "./functions/touchFunctions"

function App() {
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

    let responseReadyJSON = {}
    let ingredientSublist = []

    for(let i=0;i<newRecipeInfo.length;i++) {
      if (i===0) {
        responseReadyJSON.dish = newRecipeInfo[i].value
      } else {
        ingredientSublist.push(newRecipeInfo[i].value)
      }
    }

    // clear values
    for(let i=0;i<newRecipeInfo.length;i++) {
      newRecipeInfo[i].value = ''
    }

    responseReadyJSON.ingredients = ingredientSublist

    console.log(responseReadyJSON)

    setAddingRecipe(!addingRecipe)
    showRecipeGrid()
  }

  const showAddRecipeForm = () => {
    if (!addingRecipe) {
      hideRecipeGrid()
      addNewRecipe()
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
        <RecipeGrid sortRecipes={sortRecipes} dragged={dragged} multiList={multiList} multiListView={multiListView} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} showIngredientList={showIngredientList} addingRecipe={addingRecipe} addNewRecipe={addNewRecipe}/>
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

import { useEffect, useState } from "react"
import RecipeCard from "./recipecard/RecipeCard"
import IngredientList from "./IngredientList"
import AddRecipeForm from "./AddRecipeForm"

const RecipeGrid = ({sortRecipes, multiList, selectedIngredients, setSelectedIngredients, showIngredientList, addingRecipe, setAddingRecipe, addNewRecipe, showRecipeGrid, loggedIn, showAddRecipeForm}) => {
    const [recipeList, setRecipeList] = useState([])

    const [loadingRecipes, setLoadingRecipes] = useState(true)

    const getRecipes = () => {      
        let userInfo = JSON.stringify({userName: loggedIn})

        fetch("/recipes", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: userInfo
        })
            .then((res) => res.json())
            .then((data) => {
                data.sort(function(a, b) {
                    let dishA = a.dish.toUpperCase()
                    let dishB = b.dish.toUpperCase()

                    if (sortRecipes === "asc") {
                        if (dishA > dishB) return 1
                        if (dishA < dishB) return -1
                        return 0
                    } else {
                        if (dishA < dishB) return 1
                        if (dishA > dishB) return -1
                        return 0
                    }
                })
                setLoadingRecipes(false)
                setRecipeList(data)
            })
            .catch(err =>  console.log(err))
    }

    useEffect(getRecipes, [sortRecipes, addingRecipe, loggedIn, setRecipeList])

    const closeIngredientList = () => {
        document.getElementById("recipe-grid").classList.remove('hide-recipe-grid')

        setSelectedIngredients([])
    }

    const addToCombinedList = (e, recipe) => {
        let tempMultiList = multiList.current

        for(let i=0; i<recipe.ingredients.length; i++) {
            recipe.ingredients[i].id = recipe._id
        }

        if (!e.target.classList.contains('multiList-select')) {
            for(let i=0; i<recipe.ingredients.length; i++) {
                tempMultiList.push(recipe.ingredients[i])
            }
        } else {
            tempMultiList = tempMultiList.filter((element) => element.id !== recipe._id)
        }

        e.target.classList.toggle('multiList-select')

        if (e.target.classList.contains('multiList-select')) {
            e.target.textContent = '-'
            e.target.style.fontWeight = 'bold'
        } else {
            e.target.textContent = '+'
            e.target.style.fontWeight = ''
        }

        multiList.current = tempMultiList
    }

    const deleteRecipe = (recipe) => {
        fetch("/delete-recipe", {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
              },
            body: JSON.stringify({id: recipe._id})
            })
            .then(() => {
                getRecipes()
            })
            .catch((err) => console.log(err))  
        }
        
        if (recipeList.length > 0) {
            return (
        <div id="recipe-grid"> 
            {recipeList.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} showIngredientList={showIngredientList}  addToCombinedList={addToCombinedList} deleteRecipe={deleteRecipe}/>)}

            {selectedIngredients.length > 0 && 
            <IngredientList selectedIngredients={selectedIngredients}
            closeIngredientList={closeIngredientList}
            />}

            {addingRecipe && 
            <AddRecipeForm addNewRecipe={addNewRecipe} showRecipeGrid={showRecipeGrid} showAddRecipeForm={showAddRecipeForm}/>}
        </div>
    )
} else if (loadingRecipes) {
    return (
        <div id="recipe-grid">
            <span className="ui-message">loading...</span>

            {selectedIngredients.length > 0 && 
            <IngredientList selectedIngredients={selectedIngredients}
            closeIngredientList={closeIngredientList}
            />}

            {addingRecipe && 
            <AddRecipeForm addNewRecipe={addNewRecipe} showRecipeGrid={showRecipeGrid} showAddRecipeForm={showAddRecipeForm}/>}
        </div>
    )
} else if (!loadingRecipes) {
    return (
        <div id="recipe-grid">
            <span className="ui-message">add recipes</span>

            {addingRecipe && 
            <AddRecipeForm addNewRecipe={addNewRecipe} showRecipeGrid={showRecipeGrid} showAddRecipeForm={showAddRecipeForm}/>}
        </div>
    )
}
}

export default RecipeGrid



import { useEffect, useState, useRef } from "react"
import RecipeCard from "./recipecard/RecipeCard"
import IngredientList from "./IngredientList"
import AddRecipeForm from "./AddRecipeForm"

const RecipeGrid = ({sortRecipes, multiList, selectedIngredients, setSelectedIngredients, showIngredientList, addingRecipe, addNewRecipe}) => {
    const [recipeList, setRecipeList] = useState([])


    useEffect(() => {
        fetch("/recipes")
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
                setRecipeList(data)
            })
        }, [sortRecipes])

    const closeIngredientList = () => {
        document.getElementById("recipe-grid").classList.remove('hide-recipe-grid')

        setSelectedIngredients([])
    }

    const addToCombinedList = (e, recipe) => {
        let tempMultiList = multiList.current

        if (!e.target.classList.contains('multiList-select')) {
            for(let i=0; i<recipe.ingredients.length; i++) {
                tempMultiList.push(recipe.ingredients[i])
            }
        } else {
            tempMultiList = tempMultiList.filter((element) => element.id !== recipe.id)
        }

        e.target.classList.toggle('multiList-select')

        multiList.current = tempMultiList

        console.log(multiList.current)
    }

    
if (recipeList.length > 0) {
    return (
        <div id="recipe-grid"> 
            {recipeList.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} showIngredientList={showIngredientList}  addToCombinedList={addToCombinedList}/>)}

            {selectedIngredients.length > 0 && 
            <IngredientList selectedIngredients={selectedIngredients}
            closeIngredientList={closeIngredientList}
            />}

            {addingRecipe && 
            <AddRecipeForm addNewRecipe={addNewRecipe}/>}
        </div>
    )
} else {
    return (
        <div id="recipe-grid">
            loading...
        </div>
    )
}
}

export default RecipeGrid



import { useEffect, useState } from "react"
import RecipeTitleCard from "./RecipeCard"
import IngredientList from "./IngredientList"

const RecipeGrid = () => {
    const [recipeList, setRecipeList] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    useEffect(() => {
        fetch("/recipes")
            .then((res) => res.json())
            .then((data) => {
                setRecipeList(data)
            })
        }, [])

    const showIngredientList = (recipe) => {
        setSelectedIngredients(recipe.ingredients)
    }


if (recipeList.length > 0) {
    return (
        <div id="recipe-grid"> 
            {recipeList.map((recipe) => <RecipeTitleCard key={recipe.id} recipe={recipe} showIngredientList={showIngredientList}/>)}

            {selectedIngredients.length > 0 && 
            <IngredientList selectedIngredients={selectedIngredients}/>
            }
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

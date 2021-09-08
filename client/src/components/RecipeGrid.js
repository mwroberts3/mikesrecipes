import { useEffect, useState } from "react"
import RecipeTitleCard from "./RecipeCard"
import IngredientList from "./IngredientList"

const RecipeGrid = ({sortRecipes}) => {
    const [recipeList, setRecipeList] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

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

    const showIngredientList = (recipe) => {
        document.getElementById("recipe-grid").classList.add('hide-recipe-grid')

        setSelectedIngredients(recipe.ingredients)
    }

    const closeIngredientList = () => {
        document.getElementById("recipe-grid").classList.remove('hide-recipe-grid')

        setSelectedIngredients([])
    }


if (recipeList.length > 0) {
    return (
        <div id="recipe-grid"> 
            {recipeList.map((recipe) => <RecipeTitleCard key={recipe.id} recipe={recipe} showIngredientList={showIngredientList} />)}

            {selectedIngredients.length > 0 && 
            <IngredientList selectedIngredients={selectedIngredients}
            closeIngredientList={closeIngredientList}
            />
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

import { useEffect, useState, useRef } from "react"
import RecipeCard from "./recipecard/RecipeCard"
import IngredientList from "./IngredientList"

const RecipeGrid = ({sortRecipes, dragged}) => {
    const [recipeList, setRecipeList] = useState([])
    const [selectedIngredients, setSelectedIngredients] = useState([])

    const multiList = useRef([])

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

    const showIngredientList = (e, recipe) => {
        if (!dragged.current) {
            document.getElementById("recipe-grid").classList.add('hide-recipe-grid')


    
            setSelectedIngredients(recipe.ingredients)
        }
    }

    const closeIngredientList = () => {
        document.getElementById("recipe-grid").classList.remove('hide-recipe-grid')

        setSelectedIngredients([])
    }

    const showCombinedList = (e, recipe) => {
        let tempMultiList = multiList.current

        for(let i=0; i<recipe.ingredients.length; i++) {
            tempMultiList.push(recipe.ingredients[i])
        }

        e.target.classList.toggle('multiList-select')

        multiList.current = tempMultiList

        console.log(multiList.current)

        // needs to remove ingredients of selected recipe from the multilist if clicked off
    }

    
if (recipeList.length > 0) {
    return (
        <div id="recipe-grid"> 
            {recipeList.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} showIngredientList={showIngredientList}  showCombinedList={showCombinedList}/>)}

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



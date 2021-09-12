import { useEffect } from "react"

const RecipeTitleCard = ({ recipe, showIngredientList }) => {    
    return (
        <div className="outer-rc-container">
            <p className="recipe-card" onClick={(e) => showIngredientList(e, recipe)}>
            {recipe.dish}
            </p>
            <div className="multi-recipes">+</div>
            <div className="delete-recipe">X</div>
        </div>
    )
}

export default RecipeTitleCard


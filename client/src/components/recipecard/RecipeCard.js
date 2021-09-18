import DeleteRecipe from "./DeleteRecipe"
import MultiRecipes from "./MultiRecipes"

const RecipeTitleCard = ({ recipe, showIngredientList, showCombinedList }) => {    
    return (
        <div className="outer-rc-container">
            <p className="recipe-card" onClick={(e) => showIngredientList(e, recipe)}>
            {recipe.dish}
            </p>
            <MultiRecipes showCombinedList={showCombinedList} recipe={recipe}/>
            <DeleteRecipe />
        </div>
    )
}

export default RecipeTitleCard


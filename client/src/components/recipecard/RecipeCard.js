import DeleteRecipe from "./DeleteRecipe"
import MultiRecipes from "./MultiRecipes"

const RecipeTitleCard = ({ recipe, showIngredientList, addToCombinedList }) => {    
    return (
        <div className="outer-rc-container">
            <p className="recipe-card" onClick={(e) => showIngredientList(e, recipe)}>
            {recipe.dish}
            </p>
            <MultiRecipes addToCombinedList={addToCombinedList} recipe={recipe}/>
            <DeleteRecipe />
        </div>
    )
}

export default RecipeTitleCard


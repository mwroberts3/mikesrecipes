const RecipeTitleCard = ({ recipe, showIngredientList }) => {
    return (
        <p className="recipe-card" onClick={() => showIngredientList(recipe)}>
            {recipe.dish}
        </p>
    )
}

export default RecipeTitleCard

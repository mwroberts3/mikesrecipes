const AddRecipeForm = ({addNewRecipe}) => {
    return (
        <form id="add-new-recipe-form">
            <label>Recipe Name:</label>
            <input type="text" />
            <label>Ingredient 1:</label>
            <input type="text" />
            <label>Ingredient 2:</label>
            <input type="text" />
            <label>Ingredient 3:</label>
            <input type="text" />
            <label>Ingredient 4:</label>
            <input type="text" />
            <label>Ingredient 5:</label>
            <input type="text" />
            <label>Ingredient 6:</label>
            <input type="text" />
            <button onClick={(e) => {e.preventDefault()}}>Add Ingredient</button>
            <button onClick={(e) => {e.preventDefault() 
            addNewRecipe()}}>Submit Recipe</button>
        </form>
    )
}

export default AddRecipeForm

const AddRecipeForm = ({addNewRecipe, showRecipeGrid, showAddRecipeForm}) => {
    const anotherIngredient = (e) => {
        let ingredientInputs = document.getElementById('ingredient-inputs')
        
        let previousNewRecIngredients = []

        for(let i=0;i<Array.from(document.querySelectorAll('input')).length;i++) {
            previousNewRecIngredients.push(Array.from(document.querySelectorAll('input'))[i].value)
        }
        
        ingredientInputs.innerHTML += `
            <label>Ingredient:</label>
            <input type="text" />
        `

        for(let i=0;i<previousNewRecIngredients.length;i++) {
            Array.from(document.querySelectorAll('input'))[i].value = previousNewRecIngredients[i]
        }
    }

    return (
        <form id="add-new-recipe-form">
            <div className="close-add-recipe-form" onClick={showAddRecipeForm}>
                x
            </div>
            <h2 className="header-font padding-btm">Add New Recipe</h2>
            <div id="ingredient-inputs">
                <label>Recipe Name:</label>
                <input type="text" required/>
                <label>Ingredient:</label>
                <input type="text" />
                <label>Ingredient:</label>
                <input type="text" />
                <label>Ingredient:</label>
                <input type="text" />
                <label>Ingredient:</label>
                <input type="text" />
                <label>Ingredient:</label>
                <input type="text" />
                <label>Ingredient:</label>
                <input type="text" />
            </div>
            <button onClick={(e) => {
                e.preventDefault()
                anotherIngredient(e)
                }}>Add Ingredient</button>
            <button type="submit" onClick={(e) => {e.preventDefault()
            if (document.querySelector('input').value !== '') {
                addNewRecipe()
                showRecipeGrid()
            } else {
                window.alert('please enter recipe name or click add button to close')
            }
            }}>Submit Recipe</button>
        </form>
    )
}

export default AddRecipeForm

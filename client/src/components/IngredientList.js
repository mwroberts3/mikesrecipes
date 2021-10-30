const IngredientList = ({ selectedIngredients, closeIngredientList }) => {
    const markIngredient = (e) => {
        if (e.target.classList.contains('ingredient-selected')) {
            e.target.classList.remove('ingredient-selected')
            e.target.classList.add('ingredient-deselected')
        } else {
            e.target.classList.add('ingredient-selected')
            
            if (e.target.classList.contains('ingredient-deselected')) {
                e.target.classList.remove('ingredient-deselected')
            }
        }
    }
 
    return (
        <div className="ingredient-list-display">
            <div className="close-ingredient-list" onClick={closeIngredientList}>x</div>
            {selectedIngredients.map((ingredient, index) => <li key={index} onClick={(e) => {markIngredient(e)}}>
                {ingredient}
            </li>)}
        </div>
    )
}

export default IngredientList

const IngredientList = ({ selectedIngredients, closeIngredientList }) => {
    const markIngredient = (e) => {
        if (e.target.style.color === "green") {
            e.target.style.color = "black"
            e.target.style.fontWeight = "400"
            e.target.style.textDecoration = 'none'
        } else {
            e.target.style.color = "green"
            e.target.style.fontWeight = "300"
            e.target.style.textDecoration = 'line-through'
        }
    }
 
    return (
        <div className="ingredient-list-display">
            <div className="close-ingredient-list" onClick={closeIngredientList}>X</div>
            {selectedIngredients.map((ingredient, index) => <li key={index} onClick={(e) => {markIngredient(e)}}>
                {ingredient}
            </li>)}
        </div>
    )
}

export default IngredientList

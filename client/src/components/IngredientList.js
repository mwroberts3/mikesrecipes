const IngredientList = ({ selectedIngredients, closeIngredientList }) => {
    const markIngredient = (e) => {
        if (e.target.style.color === "green") {
            e.target.style.color = "black"
            e.target.style.fontWeight = "bold"
        } else {
            e.target.style.color = "green"
            e.target.style.fontWeight = "normal"
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

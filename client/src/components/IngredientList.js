const IngredientList = ({ selectedIngredients }) => {
    return (
        <div className="ingredient-list-display">
            {selectedIngredients.map((ingredient, index) => <li key={index}>
                {ingredient}
            </li>)}
        </div>
    )
}

export default IngredientList

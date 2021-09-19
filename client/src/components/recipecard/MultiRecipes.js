const MultiRecipes = ({ addToCombinedList, recipe }) => {
    return (
        <div className="multi-recipes" onClick={(e) => addToCombinedList(e, recipe)}>
            +
        </div>
    )
}

export default MultiRecipes

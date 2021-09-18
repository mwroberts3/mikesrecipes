const MultiRecipes = ({ showCombinedList, recipe }) => {
    return (
        <div className="multi-recipes" onClick={(e) => showCombinedList(e, recipe)}>
            +
        </div>
    )
}

export default MultiRecipes

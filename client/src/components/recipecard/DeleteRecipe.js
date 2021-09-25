const DeleteRecipe = ({recipe, deleteRecipe}) => {
    return (
        <div className="delete-recipe" onClick={() => {
            deleteRecipe(recipe)
        }}>
            X
        </div>
    )
}

export default DeleteRecipe

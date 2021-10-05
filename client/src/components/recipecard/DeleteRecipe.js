const DeleteRecipe = ({recipe, deleteRecipe}) => {
    return (
        <div className="delete-recipe" onClick={() => {
            deleteRecipe(recipe)
        }}>
            x
        </div>
    )
}

export default DeleteRecipe

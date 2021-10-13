  function hideRecipeGrid() {
    document.getElementById("recipe-grid").classList.add('hide-recipe-grid')
  }

  function showRecipeGrid() {
    document.getElementById("recipe-grid").classList.remove('hide-recipe-grid')
  }

  export { hideRecipeGrid, showRecipeGrid }
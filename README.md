# Mike's Recipes

**Version** - 1.0.0
**Release** - 10/31/21
**Created By** - [mwroberts3](https://github.com/mwroberts3)
**License** - MIT
**Website** - https://mikesrecipes.herokuapp.com/

## About

Mike's Recipe is a React-based web app that allows users to store and combine recipe dynamic ingredient lists for the purpose of shopping and not forgetting a single ingredient for one or multiple recipes.

## Usage

### Signing In/Signing Up and Logging Out

- users must login with their Google email and password
  - if user does not have a Google account they can click the link to create one on the login screen
- To **logout**, simply click the exit icon in the top right corner of the app

### Adding and Working with First Recipe

- after a user logs in they'll see the main page of the app
  - if they don't have any recipes already associated with their account, they can click the '+' sign in the top left to add one
- once a user has a recipe added, they can click the recipe title to view the ingredient list for the clicked on recipe
- a user can click on a recipe banner and swipe to the left to bring up options to add to **multi-recipe ingredient list** or delete
  - to delete, click the 'X' with the red background

### The Ingredient List

- once a user clicks the recipe title text an ingredient list will appear in the top center of the screen
- users can click on any of the individual ingredients to toggle there appearance
  - the light-green strike-through text is meant to symbolize that the ingredient has been picked up during shopping
- closing the ingredient list will erase will reset the font appearance

### Working with the Multi-Recipe list

- users have the ability to combine ingredients from multiple recipes into one ingredient list by click the '+' sign after accessing the recipe options by swiping a given recipe banner to the left
  - on desktop and most mobile devices, the user can just click on the outermost dark gray portion of the add button that appears on the end of each recipe banner without any swiping to the left
- users can click the '+' sign on as many recipes as they'd like to build as big of a **multi-recipe ingredient list** as they'd like
- to view the current state of the users can click the stack icon in the top left corner on the app
  - one opened, the **multi-recipe ingredient list** operates the same way as a single recipe list

## Future Updates

- allow users to rearrange the order of the recipes anyway they wish
- add more fields to each recipe such as date added, how many servings there are and maybe price per serving
- allow users to edit recipes

## Version History

**1.0.0** - released 10/31/21

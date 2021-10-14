const { ObjectID } = require('mongodb')

const authController = require('./authController')

exports.gatherRecipeList = async (client, userName) => {
    // encrypt userName
    let encryptedUserName = authController.encryptUserName(userName)

    // console.log(encryptedUserName)

    let recipeList
        
    const cursor = client.db("recipes").collection("recipelist")
        .find({"userHash": userName})

    recipeList = await cursor.toArray()

    return recipeList
}

exports.addRecipe = async (client, recipeData) => {
    console.log(recipeData)

    client.db("recipes")
        .collection("recipelist")
        .insertOne(recipeData)
}
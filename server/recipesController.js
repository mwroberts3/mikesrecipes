const { ObjectID } = require('mongodb')

const authController = require('./authController')

exports.gatherRecipeList = async (client, userName) => {
    // encrypt userName
    let encryptedUserName = authController.encryptUserName(userName)

    console.log(encryptedUserName)

    let recipeList
        
    const cursor = client.db("recipes").collection("recipelist")
        .find({"userHash": encryptedUserName})

    recipeList = await cursor.toArray()

    return recipeList
}

exports.addRecipe = async (client, recipeData) => {
    // encrypt userName
    let encryptedUserName = authController.encryptUserName(recipeData.userHash)

    recipeData.userHash = encryptedUserName

    client.db("recipes")
        .collection("recipelist")
        .insertOne(recipeData)
}

exports.deleteRecipe = async (client, recipeID) => {
    client.db("recipes")
        .collection("recipelist")
        .deleteOne({ _id: ObjectID(recipeID)})
}
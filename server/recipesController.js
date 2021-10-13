const { ObjectID } = require('mongodb')
const bcrypt = require('bcrypt')
const saltRounds = 10
// const myPlaintextPassword = 's0/\/\P4$$w0rD'
// const someOtherPlainTextPassword = 'not_bacon'

exports.gatherRecipeList = async (client, userName) => {
    let recipeList

    const cursor = client.db("recipes").collection("recipelist")
        .find()

    recipeList = await cursor.toArray()

    // seems like this would be inefficient, but I think I need to compare every userHash in the database with the bcrypt compare function and compare the current username with each hash in the db and if true add it to the displayed recipes list

    //     bcrypt.compare(req.body.userName, testHash)
    //         .then((result) => console.log(result))

    return recipeList
}

exports.addRecipe = async (client, recipeData) => {
    console.log(recipeData)

    client.db("recipes")
        .collection("recipelist")
        .insertOne({

        })
}
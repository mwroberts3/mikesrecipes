const express = require("express")
const PORT = process.env.PORT || 3001
const app = express()

const path = require('path')
const bodyParser = require('body-parser')

const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://mwroberts:mwr92089@cluster0.ko3ht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useUnifiedTopology: true})

const recipesController = require('./recipesController')

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use(bodyParser.json())


app.post("/recipes", (req, res) => {
    // pull recipes that are associated with hashed username
    recipesController.gatherRecipeList(client, req.body.userName)
    .then((recipeList) => {
        res.status(200).json(recipeList)
    })
    .catch(err => console.log(err))  
})

app.post("/add-recipe", (req, res) => {
    recipesController.addRecipe(client, req.body)
    res.status(201).json()
})

app.delete("/delete-recipe", (req, res) => {
    recipesController.deleteRecipe(client, req.body.id)
    res.status(200).json()
})

app.listen(PORT, () => {
    main().catch(err => console.log(err))

    console.log(`server listening on ${PORT}`)
})

async function main() {
    try {
        await client.connect()
    } catch {
        console.error()
    }
}
const express = require("express")
const PORT = process.env.PORT || 3001
const app = express()

const path = require('path')
const bodyParser = require('body-parser')

const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://mwroberts:mwr92089@cluster0.ko3ht.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri, {useUnifiedTopology: true})

const recipesController = require('./recipesController')

// app.use(express.static(path.resolve(__dirname, '../client/build')))

app.use(bodyParser.json())


app.post("/recipes", (req, res) => {
    console.log(req.body.userName)
    console.log('get recipes')

    let userNameHash; 

    // hash active username
    bcrypt.hash(req.body.userName, saltRounds, function(err, hash) {
        console.log(hash)
        userNameHash = hash
    })

    // hash test
    // setTimeout(() => {

    // }, 5000)

    // pull recipes that are associated with hashed username
    recipesController.gatherRecipeList(client, req.body.userName)
    .then((recipeList) => {
        console.log(recipeList)
        res.json(recipeList)
    })
    .catch(err => console.log(err))  
})

app.post("/add-recipe", (req, res) => {
    console.log('add recipe')
    recipesController.addRecipe(client, req.body)
})

app.delete("/delete-recipe", (req, res) => {
    console.log('delete recipe')
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
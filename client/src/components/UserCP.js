import { FaSignOutAlt, FaSort, FaPlusSquare, FaLayerGroup } from 'react-icons/fa'

const UserCP = ({setSortRecipes, sortRecipes, multiList, setSelectedIngredients, showAddRecipeForm}) => {
    const cpSortRecipes = () => {
        if (sortRecipes === "asc") {
            setSortRecipes('dsc')
        } else {
            setSortRecipes('asc')
        }
    }

    const showMultiRecipeList = (e) => {
        console.log(multiList.current)

        if (multiList.current.length > 0) {
            document.getElementById('recipe-grid').style.height = '100vh'
            document.getElementById('recipe-grid').classList.add('hide-recipe-grid')
    
            let tempIngredientList = []
            for (let i=0; i<multiList.current.length; i++) {
                tempIngredientList.push(multiList.current[i].item)
            }
            setSelectedIngredients(tempIngredientList)        
        }

    }

    return (
        <div id="user-control-panel">
            <p>
                <FaSort className="icon" onClick={cpSortRecipes}/>
                <FaPlusSquare className="icon" onClick={showAddRecipeForm}/>
                <FaLayerGroup className="icon" onClick={(e) => {
                    showMultiRecipeList(e)
                }}/>
            </p>
            <h2>Good Names Taken</h2>
            <p>
                <FaSignOutAlt className="icon"/>
            </p>
        </div>
    )
}

export default UserCP

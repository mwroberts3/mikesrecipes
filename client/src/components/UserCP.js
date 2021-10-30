import firebase from '../firebase'
import { FaSignOutAlt, FaSort, FaPlusSquare, FaLayerGroup } from 'react-icons/fa'

const UserCP = ({setSortRecipes, sortRecipes, multiList, setSelectedIngredients, setAddingRecipe}) => {
    const cpSortRecipes = () => {
        if (sortRecipes === "asc") {
            setSortRecipes('dsc')
        } else {
            setSortRecipes('asc')
        }
    }

    const showMultiRecipeList = (e) => {
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

    const userLogout = () => {
        firebase.auth().signOut()
    }

    return (
        <>
        <div id="user-control-panel">
            <h2 className="header-font">Mike's Recipes</h2>
            <p>
                <FaSort className="icon" onClick={cpSortRecipes}/>
                <FaPlusSquare className="icon" onClick={() => setAddingRecipe(true)}/>
                <FaLayerGroup className="icon" onClick={(e) => {
                    showMultiRecipeList(e)
                }}/>
                <FaSignOutAlt className="icon logout" onClick={userLogout}/>
            </p>
        </div>
        </>
    )
}

export default UserCP

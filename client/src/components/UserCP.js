import { FaSignOutAlt, FaSort, FaPlusSquare } from 'react-icons/fa'

const UserCP = ({setSortRecipes, sortRecipes}) => {
    const cpSortRecipes = () => {
        if (sortRecipes === "asc") {
            setSortRecipes('dsc')
        } else {
            setSortRecipes('asc')
        }
    }

    return (
        <div id="user-control-panel">
            <p>
                <FaSort className="icon" onClick={cpSortRecipes}/>
                <FaPlusSquare className="icon"/>
            </p>
            <h2>Mike's Recipes</h2>
            <p>
                <FaSignOutAlt className="icon"/>
            </p>
        </div>
    )
}

export default UserCP

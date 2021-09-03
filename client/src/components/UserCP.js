import { FaSignOutAlt, FaSort, FaPlusSquare } from 'react-icons/fa'

const UserCP = () => {
    return (
        <div id="user-control-panel">
            <p>
                <FaSort className="icon"/>
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

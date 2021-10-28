import firebase from "../firebase"

const Login = ({setLoggedIn}) => {
    const signIn = () => {
        let provider = new firebase.auth.GoogleAuthProvider()

        firebase.auth().signInWithRedirect(provider)
    }


    return (
        <div>
            <button onClick={signIn}>
                Login with Google
            </button>
            <button className="google-signup">
                <a href="https://accounts.google.com/signup/v2/webcreateaccount?continue=https%3A%2F%2Fwww.google.com%2F&hl=en&biz=false&flowName=GlifWebSignIn&flowEntry=SignUp">Signup for Google</a>
            </button>
        </div>
    )
}

export default Login

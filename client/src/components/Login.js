import firebase from "../firebase"

const Login = () => {

    const signIn = () => {
        let provider = new firebase.auth.GoogleAuthProvider()
        
        firebase.auth()
          .signInWithRedirect(provider)
    }


    return (
        <button onClick={signIn}>
            Login
        </button>
    )
}

export default Login

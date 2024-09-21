import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";


interface LoginProps {
    authState: string, 
    setAuthState: (authState: string) => void
}

function Login({setAuthState}: LoginProps) {

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState(""); 
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async(e: { preventDefault: () => void; }) => {
      try{
          e.preventDefault();
          await signInWithEmailAndPassword(auth, email, password);
          console.log("user logged in sucessfuly");
          navigate("/movies")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch(e) {
          setErrorMessage("Authentication failed: invalid credentials. Please signup if you don't have an account.");
      }
  }

  return (
    <>  

        <center style={{margin:30}}>
            <h1> Welcome back! Log in below </h1>
        </center>
      <div className="container d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br></br>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div> <br></br>

            <button onClick={() => {}} type="submit" className="btn btn-dark">
            Sign In
            </button>

            <button  onClick={() => {setAuthState("signup")}} type="submit" className="btn btn-light" style={{margin:20}}>
            Dont have an account? Sign Up
            </button>
            <br></br>
              <p style={{color:"red"}}> {errorMessage} </p>
          </form>
      </div>
    </>


  );
}

export default Login;

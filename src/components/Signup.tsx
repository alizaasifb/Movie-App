import { useState } from "react";
import { createUserWithEmailAndPassword, UserCredential} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, database } from "./firebase";

interface SignupProps {
    authState: string, 
    setAuthState: (authState: string) => void
}

function Signup({setAuthState}: SignupProps) {

    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>(""); 
    const [fullName, setFullName] = useState<string>("")
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("")

    const handleSubmit = async(e: { preventDefault: () => void; }) => {
        try{
            e.preventDefault();
            const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);            const user = userCredential.user;
            console.log("user signed up sucessfuly");
            try {
              await setDoc(doc(database, "users", user.uid), {
                fullName: fullName, 
                email: email, 
              })
              navigate("/movies")
            }
            catch(e) {
                console.error("Error occured in adding document", e);
                setErrorMessage("There was an error in signing you up. Please try again later.");
            }
        } catch(error) {
            setErrorMessage((error as Error).message.replace("Firebase: ", ""));
            console.log((error as Error).message);
        }
    }

  return (
    <>

      <center style={{margin:30}}>
          <h1> Welcome! Sign up below </h1>
      </center> 

      <div style={{marginTop: 50}} className="container d-flex justify-content-center align-items-center">
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="exampleInputName1">Name (optional)</label>
            <input
              type="name"
              className="form-control"
              id="exampleInputName1"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div> <br></br>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input
              type="username"
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
          </div>{" "}
          <br></br>
          <button onClick={() => {}} type="submit" className="btn btn-dark" style={{margin:20}}>
            Sign Up
          </button>
          <button onClick={() => {setAuthState("signin")}} type="submit" className="btn btn-light">
            Have an account? Sign In
          </button>
          <br></br>
          <p style={{color:"red"}}> {errorMessage} </p>
        </form>
      </div>
    </>
  );
}

export default Signup;

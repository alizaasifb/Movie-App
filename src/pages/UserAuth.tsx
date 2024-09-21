import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

function UserAuth() {

    const [authState, setAuthState] = useState<string>("signup")
    
    return (
    <>
        <div style={{ height: "100vh", marginTop: "10%" }}>
            {
                authState === "signup" ? (
                    <Signup authState={authState} setAuthState={setAuthState} />
                ) : (
                    <Login authState={authState} setAuthState={setAuthState} />
                )
            }
        </div>
    </>
    )
}

export default UserAuth;
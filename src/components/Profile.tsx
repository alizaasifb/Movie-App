import { ReactNode, useEffect, useState } from "react";
import  {auth, database } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
    children: ReactNode
}

function Profile({children}: ProfileProps) {

    const [name, setName] = useState<string>("");
    const navigate = useNavigate();

    const getName = async () => {
        if (auth.currentUser) {
            console.log("User is authenticated with UID:", auth.currentUser.uid);
            const userRef = doc(database, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const data = userDoc.data();
                if (data && data.fullName) {
                    setName(data.fullName);
                }
            } 
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getName();
            } else {
                navigate("/home")
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const logoutFunction = async () => {
        try {
            await signOut(auth);
            navigate("/home")
            console.log("User logged out successfully");
        } catch (error) {
            console.error("Error logging out: ", error);
        }
    };

    const handleNavigation = () => {
        if (children == " Go to saved movies ")
            navigate("/saved")
        else 
            navigate("/movies")
    }

    return (
        <>  
        <div style={{ marginTop: 50 }}>
        <center>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#ffffff" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
        </center>
        
        <i className="bi bi-person-circle" ></i>
            <center> <h4 style={{ margin: 12, color: '#ffffff' }}> {name} </h4> <button type="button" className="btn btn-danger" onClick={logoutFunction}>Logout</button> </center>
            <br/><br/>
            <center><button type="button" className="btn btn-success" onClick={handleNavigation}>{children}</button></center>
        </div>
        </>
    )
}

export default Profile;
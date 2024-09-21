import {  arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "./firebase";
import { useNavigate } from "react-router-dom";

export interface MovieProps {
    id: number, 
    title: string, 
    overview: string, 
    poster_path: string, 
    isBookmarked: boolean
}

function Movie({id, title, overview, poster_path, isBookmarked} : MovieProps) {

    const navigate = useNavigate();

    async function bookmarkMovie(movie: MovieProps){
        if (auth.currentUser) {
          const userRef = doc(database, "users", auth.currentUser.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            await updateDoc(userRef, {
                bookmarks: arrayUnion(movie)
            });
            }
            else {
                await setDoc(userRef, {
                bookmarks: [{id, title, overview, poster_path, isBookmarked: true}], 
                email: auth.currentUser.email
                }); 
            }
        }
        else {
          navigate("/home")
        }
    }

    async function unbookmarkMovie(movie: MovieProps) {
        if (auth.currentUser) {
            const userRef = doc(database, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const currentBookmarks = userDoc.data().bookmarks || [];    
                const updatedBookmarks = currentBookmarks.filter((m: MovieProps) => m.id !== movie.id);
                await updateDoc(userRef, {
                bookmarks: updatedBookmarks
                });
            }
            window.location.reload(); 
        }
    }
        

    return (
        <>
            <div className="card" style={{marginBottom: 30, padding:20}}>
                <div className="col" key={id} >
                    <img style={{ width: '100%', height: 'auto', objectFit: 'cover' }} src={"https://image.tmdb.org/t/p/w300" + poster_path} />
                    <div className="card-body"> <h2 className="text-truncate">{title}</h2> <br/> 
                    <p className="card-text text-truncate">  {overview}</p> </div>
                    {
                        isBookmarked 
                        ? (
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    unbookmarkMovie({id, title, overview, poster_path, isBookmarked}) 
                                }}
                            >
                                Remove from Bookmarks
                            </button>
                        ) 
                        : (
                            <button 
                                type="button" 
                                className="btn btn-success" 
                                onClick={(e) => { 
                                    e.stopPropagation(); 
                                    bookmarkMovie({id, title, overview, poster_path, isBookmarked}) 
                                }}
                            >
                                Bookmark
                            </button>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Movie
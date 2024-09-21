import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, database } from "./firebase.tsx";
import Movie, { MovieProps } from "./Movie.tsx";
import MoviePopup from "./MoviePopup.tsx";
import { useNavigate } from "react-router-dom";

function Bookmarks() {
    const [savedMovies, setSavedMovies] = useState<MovieProps[]>([]); 
    const navigate = useNavigate();

    const getBookmarks = async () => {
        if (auth.currentUser) {
            const userRef = doc(database, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const data = userDoc.data();
                if (data && data.bookmarks) {
                    const validMovies = data.bookmarks.filter((movie: MovieProps) => movie.id && movie.title && movie.poster_path);
                    setSavedMovies(validMovies);
                } 
            } 
        } else {
            navigate("/home")
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                getBookmarks(); 
            } else {
                navigate("/home")
            }
        });
    
        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    
    const [popupVisible, setPopupVisibility] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);  
    
    const onSelectItem = (movie: MovieProps) => {
      setPopupVisibility(true);
      setSelectedMovie(movie);
    };

    return (
        <>
        <center style={{margin:30}}>
            <h2> Your Saved Movies </h2>
        </center>
        {savedMovies.length == 0 && <div>No saved movies yet!</div>}
        { popupVisible && selectedMovie && <MoviePopup movie={selectedMovie} 
        onClose={() => setPopupVisibility(false)} > </MoviePopup> }
        <div className="container-fluid text-center">

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {savedMovies.map((item) => (
            <div key={item.id} onClick={() => onSelectItem(item)}>
                <Movie isBookmarked={true} id={item.id} title={item.title} overview={item.overview} poster_path={item.poster_path} />
            </div>
            ))}
        </div>
        </div>    

        </> 
    );
}

export default Bookmarks;
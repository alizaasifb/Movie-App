// import { useState } from "react";
import MovieGrid from "../components/MovieGrid";
import Profile from "../components/Profile";
import { MovieTypes } from "../components/MovieTypes";
import { useState } from "react";

function Movies() {

    const [moviesType, setMoviesType] = useState<string>("Most Popular");
    
    return <>    
        <div className="container-fluid">
        <div className="row flex-nowrap ">
            <div className="col-sm-3 sidebar col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sticky-top"  
                style={{ 
                    height: '100vh', 
                    minHeight: '-webkit-fill-available', 
                    overflowY: 'auto'
                }}>
                <Profile> Go to saved movies </Profile>
                <MovieTypes moviesType={moviesType} setMoviesType={setMoviesType} />
            </div>
            <div className="col-sm-9 main" style={{marginTop: 50}}>
                
                <MovieGrid movies_type={moviesType} />
            </div>
        </div>
        </div> 
    </>
}

export default Movies;
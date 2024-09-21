import Bookmarks from "../components/Bookmarks";
import Profile from "../components/Profile";

function SavedMovies() {
    return (
        <>
        <div className="container-fluid">
        <div className="row flex-nowrap ">
            <div className="col-sm-3 sidebar col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sticky-top" style={{ height: '100vh' }}>
                <Profile> Go back to all movies </Profile>
            </div>
            <div className="col-sm-9 main" style={{marginTop: 50}}>
                <Bookmarks/>
            </div>
        </div>
        </div> 
        </>
    )
}

export default SavedMovies;
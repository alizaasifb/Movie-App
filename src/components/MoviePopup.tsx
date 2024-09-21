import { ReactNode } from "react";
import { MovieProps } from "./Movie";

interface MoviePopupProps {
    children: ReactNode;
    movie: MovieProps;
    onClose: () => void;
}

const MoviePopup = ({children, movie, onClose}: MoviePopupProps) => {
    return (
        <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show d-block" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content" style={{padding:30}}>
                        <button type="button" onClick={onClose} className="btn-close position-absolute top-0 end-0 m-3" aria-label="Close"></button>
                        <h1>{movie.title}</h1> 
                        {<img src={"https://image.tmdb.org/t/p/w300" + movie.poster_path} />}
                        {movie.overview} 
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoviePopup;
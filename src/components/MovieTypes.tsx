interface MovieTypesProps {
    moviesType: string;
    setMoviesType: (moviesType : string) => void;
}

export function MovieTypes({ setMoviesType }: MovieTypesProps) {

    const  onClickButton = (moviesType: string) => {
        setMoviesType(moviesType);
    }

    return (
        <>
            <center>
                <div className="buttons">
                    <br/><br/>
                    <button type="button" className="btn btn-info" onClick={() => onClickButton("Horror")}> Horror </button>
                    <br/><br/>
                    <button type="button" className="btn btn-info" onClick={() => onClickButton("Comedy")}> Comedy </button>
                    <br/><br/>
                    <button type="button" className="btn btn-info" onClick={() => onClickButton("Action")}> Action </button>
                    <br/><br/>
                    <button type="button" className="btn btn-info" onClick={() => onClickButton("Romance")}> Romance </button>
                    <br/><br/>
                    <button type="button" className="btn btn-info" onClick={() => onClickButton("Scifi")}> Scifi </button>
                    <br/><br/>
                    <button type="button" className="btn btn-info" onClick={() => onClickButton("Most Popular")}> Popular </button>
                    <br/><br/>
                    <button type="button" className="btn btn-info" onClick={() => onClickButton("Upcoming")}> Upcoming </button>
                    <br/><br/>
                    <button type="button" className="btn btn-info" onClick={() => onClickButton("Now Playing")}> Now Playing </button>
                </div>
            </center>
        </>
    )
}
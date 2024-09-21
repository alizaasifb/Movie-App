import {BrowserRouter, Routes, Route} from 'react-router-dom';
import UserAuth from './pages/UserAuth.tsx';
import Movies from './pages/Movies.tsx';
import SavedMovies from './pages/SavedMovies.tsx';

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route index element={<UserAuth/>}/>
            <Route path="/home" element={<UserAuth/>}/>
            <Route path="/signup" element={<UserAuth/>}/>
            <Route path="/movies" element={<Movies/>} />
            <Route path="/saved" element={<SavedMovies/>} />
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;
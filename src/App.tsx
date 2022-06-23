import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import WhiteBoardHome from './pages/WhiteBoardHome/WhiteBoardHome';


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/whiteboard/:roomId"
                        element={<WhiteBoardHome  />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import SuperHero from './pages/Superhero';
import Home from './pages/Home';

function App() {


  return (
    <>
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
      </nav>


      <Routes>
        <Route path="superhero/:id" element={<SuperHero />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import SuperHero from './pages/Superhero';
import Home from './pages/Home';
import Header from './components/Header';


function App() {


  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="superhero/:id" element={<SuperHero />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

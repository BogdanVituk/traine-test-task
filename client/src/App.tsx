
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import SuperHero from './pages/Superhero';
import Home from './pages/Home';
import Header from './components/Header';
import GlobalError from './components/Erorr';



function App() {


  return (
    <>
    <BrowserRouter>
      <Header/>
      <GlobalError/>
      <Routes>
        <Route path="superhero/:id" element={<SuperHero />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App



import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Import routes
import Home from './routes/Home';
import About from './routes/About';

//Import components
import Navbar from "./components/Navbar";
import Herodetails from './routes/Herodetails';
import Footer from './components/Footer';
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/about'} element={<About/>}/>
        <Route path={"/:id"} element={<Herodetails/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;

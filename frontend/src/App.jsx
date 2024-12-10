import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Canvas from "./components/Canvas";
import Login from "./components/Auth/login";
import Signup from "./components/Auth/signup";
import Logout from './components/Auth/logout';
import { AuthContext } from './context/AuthContext';
import About from './components/About';
import Read from './components/Read';

const App = () => {
  const { isLogged } = useContext(AuthContext);

  const ProtectedRoute = ({ element }) => {
    return isLogged ? element : <Navigate to="/login" />;
  };

  const HiddenRoute = ({ element }) => {
    return isLogged ? <Navigate to="/" /> : element;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canvas" element={<Canvas />} /> {/* Public Route */}
        <Route path="/about" element={<About />} /> {/* Public Route */}
        <Route path="/read" element={<Read />} /> {/* Public Route */}
        <Route path='/login' element={<HiddenRoute element={<Login />} />} />
        <Route path='/signup' element={<HiddenRoute element={<Signup />} />} />
        <Route path="/logout" element={<ProtectedRoute element={<Logout />} />} />
      </Routes>
    </Router>
  );
}

export default App;
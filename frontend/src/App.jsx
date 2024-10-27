import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Canvas from "./components/Canvas";
import Login from "./components/Auth/login";
import Signup from "./components/Auth/signup";
import Logout from './components/Auth/logout';
import { AuthContext } from './context/AuthContext';
import About from './components/About';
import UserFlow from './components/UserFlow';

const App = () => {
  const { isLogged } = useContext(AuthContext);

  const ProtectedRoute = ({ element }) => {
    return isLogged ? element : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Public Route */}
        <Route path="/signup" element={<Signup />} /> {/* Public Route */}
        <Route path="/logout" element={<Logout />} /> {/* Public Route */}
        <Route path="/canvas" element={<Canvas />} /> {/* Public Route */}
        <Route path="/about" element={<About />} /> {/* Public Route */}
        <Route path="/read" element={<UserFlow />} /> {/* Public Route */}
        {/* <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<Dashboard />} />} 
        /> Protected Route */}
      </Routes>
    </Router>
  );
}

export default App;
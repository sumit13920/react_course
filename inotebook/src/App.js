import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import { useNote } from './hooks/useNote'; 

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useNote();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Auth Route Component (for login/signup when authenticated)
const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useNote();
  return !isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  return (
    <NoteState>
      <Router>
        <Navbar />
         {alert && <Alert message={alert.message} type={alert.type} />}
        <div className="container">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            } />
             <Route path="/signup" element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
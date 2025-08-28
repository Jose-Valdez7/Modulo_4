import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import Perfil from './pages/Perfil';
import Login from './components/Login';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="*"
            element={
              <div className="App d-flex flex-column min-vh-100">
                <Navbar />
                <main className="flex-fill d-flex flex-column align-items-center justify-content-center py-4">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/perfil" element={<Perfil />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

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
              <>
                <Navbar />
                <main className="pt-24 pb-16 min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-yellow-50 to-blue-900">
                  <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/perfil" element={<Perfil />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

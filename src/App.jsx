import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/CreateProject';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';

// A small sub-component for the Navbar so it can consume the AuthContext
function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
      <div className="text-2xl font-black text-indigo-700 tracking-tighter">
        ResearchGrid.
      </div>
      <div className="flex items-center gap-6 font-medium text-gray-600">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
        
        {/* Only show New Project link if Admin */}
        {user?.role === 'ADMIN' && (
          <Link to="/create" className="hover:text-indigo-600 transition-colors">New Project</Link>
        )}

        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-bold">
              {user.role}
            </span>
            <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-900 cursor-pointer">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="px-5 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-sm font-semibold transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateProject />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

// We will build these two pages next!
const CreateProject = () => <div className="p-10 text-center text-xl">Create Project Form Coming Next...</div>;
const Login = () => <div className="p-10 text-center text-xl">Role-Based Login Coming Soon...</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        
        {/* Universal Navigation Bar */}
        <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
          <div className="text-2xl font-black text-indigo-700 tracking-tighter">
            ResearchGrid.
          </div>
          <div className="flex gap-6 font-medium text-gray-600">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
            <Link to="/create" className="hover:text-indigo-600 transition-colors">New Project</Link>
            <Link to="/login" className="px-4 py-1 bg-gray-100 rounded-full hover:bg-gray-200 text-sm flex items-center">
              Login
            </Link>
          </div>
        </nav>

        {/* Page Routing */}
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreateProject />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
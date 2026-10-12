import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate('/'); // Send back to dashboard after login
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-md border border-gray-200 max-w-md w-full text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Select a role to simulate RBAC access.</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => handleLogin('ADMIN')}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            Log in as Admin (Full Access)
          </button>
          
          <button 
            onClick={() => handleLogin('VIEWER')}
            className="w-full bg-white border-2 border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Log in as Viewer (Read-Only)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
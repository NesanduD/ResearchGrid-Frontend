import { useState } from 'react'; // To manage form input state and submission state
import { useNavigate } from 'react-router-dom'; // to automatically redirect the user after successful submission
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

function CreateProject() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role !== 'ADMIN') {
      alert("Access Denied: Only Admins can create projects.");
      navigate('/');
    }
  }, [user, navigate]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    researchArea: '',
    status: 'Active'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8080/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/'); // Redirect back to dashboard on success
      } else {
        alert('Failed to save project. Check backend logs.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Network error. Is the Spring Boot server running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Project</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Project Title</label>
            <input 
              type="text" 
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g., Quantum Cryptography Protocols"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Research Area</label>
            <input 
              type="text" 
              name="researchArea"
              required
              value={formData.researchArea}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="e.g., Computer Science"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
            >
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Paused">Paused</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-4">
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 cursor-pointer"
            >
              {isSubmitting ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
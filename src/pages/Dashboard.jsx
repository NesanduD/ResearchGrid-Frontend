import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(null);
  const [projectMilestones, setProjectMilestones] = useState({});

  useEffect(() => {
    fetch('http://localhost:8080/api/projects')
      .then(response => response.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching projects:", error));
  }, []);

  const generateMilestones = async (projectId) => {
    setAiLoading(projectId);
    try {
      const response = await fetch(`http://localhost:8080/api/projects/${projectId}/ai-milestones`);
      const text = await response.text();
      
      setProjectMilestones(prev => ({
        ...prev,
        [projectId]: text
      }));
    } catch (error) {
      console.error("Failed to connect to the AI service.", error);
    } finally {
      setAiLoading(null);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-gray-500 font-medium text-lg bg-gray-50">Loading enterprise data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">ResearchGrid Dashboard</h1>
          <Link to="/create" className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm">
            + New Project
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-lg flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800 leading-tight">{project.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  project.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {project.status || 'Active'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-6 flex-grow">
                <p><span className="font-semibold text-gray-700">Research Area:</span> {project.researchArea}</p>
              </div>

              {projectMilestones[project.id] && (
                <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                  <h3 className="text-sm font-bold text-indigo-900 mb-2 flex items-center gap-2">
                    ✨ AI Suggested Milestones
                  </h3>
                  <p className="text-sm text-indigo-800 whitespace-pre-wrap leading-relaxed">
                    {projectMilestones[project.id]}
                  </p>
                </div>
              )}

              <button 
                onClick={() => generateMilestones(project.id)}
                disabled={aiLoading === project.id}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:bg-indigo-300 flex justify-center items-center shadow-sm cursor-pointer mt-auto"
              >
                {aiLoading === project.id ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                  </span>
                ) : 'Generate AI Milestones'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
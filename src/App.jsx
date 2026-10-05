import { useState, useEffect } from 'react';

function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(null);

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
      alert(`AI Milestones:\n\n${text}`);
    } catch (error) {
      alert("Failed to connect to the AI service.");
    } finally {
      setAiLoading(null);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500 font-medium text-lg">Loading enterprise data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">ResearchGrid Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800 leading-tight">{project.title}</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  project.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {project.status || 'Active'}
                </span>
              </div>
              
              <div className="text-sm text-gray-600 mb-6">
                <p><span className="font-semibold text-gray-700">Research Area:</span> {project.researchArea}</p>
              </div>

              <button 
                onClick={() => generateMilestones(project.id)}
                disabled={aiLoading === project.id}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:bg-indigo-300 flex justify-center items-center shadow-sm cursor-pointer"
              >
                {aiLoading === project.id ? 'Thinking...' : '✨ Generate AI Milestones'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
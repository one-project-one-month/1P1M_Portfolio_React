import SwitchBar from './common/switch-bar';
import ProjectStatusBar from './ui/project-status-bar';

function DashboardProjectDeadlineSection() {
  return (
    <div className="custom-card h-full">
      <SwitchBar options={['Projects Ending Soon', 'Overdue Projects']} />
      <div className="mt-4">
        <div className="flex justify-between p-2 py-3 text-white bg-slate-700 rounded-xl">
          <h1>Project Name</h1>
          <h1>Date</h1>
        </div>
        <div className="flex py-2 flex-col gap-2">
          <ProjectStatusBar
            title="AI-Powered Career Path Predictor"
            date="12 Feb"
          />
          <ProjectStatusBar
            title="AI-Powered Career Path Predictor"
            date="12 Feb"
          />
          <ProjectStatusBar
            title="AI-Powered Career Path Predictor"
            date="12 Feb"
          />
          <ProjectStatusBar
            title="AI-Powered Career Path Predictor"
            date="12 Feb"
          />
          <ProjectStatusBar
            title="Automated Web-Based Resume Parser & Ranker"
            date="12 Feb"
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardProjectDeadlineSection;

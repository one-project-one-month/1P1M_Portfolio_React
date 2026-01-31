import SwitchBar from './common/switch-bar';
import ProgressBar from './ui/progress-bar';

function DashboardTechStack() {
  return (
    <div className="h-full custom-card">
      <SwitchBar options={['Role Distribution', 'Tech Stack']} />
      <div className="bg-slate-800 gap-3 flex flex-col flex-1 rounded-lg mt-3 p-3">
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <ProgressBar
              key={i}
              label="Completed"
              value={30}
              barClassName="bg-primary-custom"
            />
          );
        })}
      </div>
    </div>
  );
}

export default DashboardTechStack;

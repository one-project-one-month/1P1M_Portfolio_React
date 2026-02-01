import RegisterationAndCompletedChart from './charts/registeration-and-completed-chart';
import SwitchBar from './common/switch-bar';

function DashboardRegisterationAndCompletedProjectDisplaySection() {
  return (
    <div className="custom-card">
      <SwitchBar
        options={['Monthly OPOM Registrations', 'Monthly Completed Projects']}
      />
      <div className="bg-slate-800 rounded-lg mt-3 p-3">
        <RegisterationAndCompletedChart />
      </div>
    </div>
  );
}

export default DashboardRegisterationAndCompletedProjectDisplaySection;

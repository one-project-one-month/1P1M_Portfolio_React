import useDashboard from '../hooks/useDashboard';
import DashboardActiveUserSection from './dashboard-active-user-section';
import DashboardHeader from './dashboard-header';
import DashboardPopularSection from './dashboard-popular-section';
import DashboardProjectDeadlineSection from './dashboard-project-deadline-section';
import DashboardProjectStatusSection from './dashboard-project-status-section';
import DashboardRegisterationAndCompletedProjectDisplaySection from './dashboard-registeration-and-completed-project-display-section';
import DashboardSummarySection from './dashboard-summary-section';
import DashboardTechStack from './dashboard-tech-stack';
import DashboardYearToDateGrowthSection from './dashboard-year-to-date-growth-section';

function DashboardContainer() {
  const {
    dashboardSummary,
    yearToDateGrowth,
    registrationsAndCompletedProjects,
    inactiveUsers,
    projectStatus,
    projectDeadlines,
    roleDistribution,
    popularData,
  } = useDashboard();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-6 grid-rows-9 gap-4">
        <div className="col-span-4 gap-y-8 flex flex-col row-span-3">
          <DashboardHeader />
          <DashboardSummarySection
            data={dashboardSummary ?? null}
            className="flex-1"
          />
        </div>
        <div className="col-span-2 row-span-5 col-start-5">
          <DashboardProjectDeadlineSection data={projectDeadlines} />
        </div>
        <div className="col-span-4 row-span-6 row-start-4">
          <DashboardYearToDateGrowthSection data={yearToDateGrowth} />
        </div>
        <div className="col-span-2 row-span-4 col-start-5 row-start-6">
          <DashboardActiveUserSection data={inactiveUsers} />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <DashboardRegisterationAndCompletedProjectDisplaySection
            data={registrationsAndCompletedProjects}
          />
        </div>
        <div className="col-span-2">
          <DashboardProjectStatusSection data={projectStatus} />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <DashboardPopularSection data={popularData} />
        </div>
        <div className="col-span-2">
          <DashboardTechStack data={roleDistribution} />
        </div>
      </div>
    </div>
  );
}

export default DashboardContainer;

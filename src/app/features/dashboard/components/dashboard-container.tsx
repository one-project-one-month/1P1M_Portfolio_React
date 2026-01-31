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
  return (
    // <div className="grid grid-cols-3 gap-4">
    //   <div className="col-span-2 flex flex-col gap-4">
    //     <DashboardHeader />
    //     <DashboardSummarySection />
    //     <DashboardYearToDateGrowthSection />
    //     <DashboardRegisterationAndCompletedProjectDisplaySection />
    //     <DashboardPopularSection />
    //   </div>
    //   <div className="col-span-1 flex flex-col gap-4">
    //     <DashboardProjectDeadlineSection />
    //     <DashboardActiveUserSection />
    //     <DashboardProjectStatusSection />
    //   </div>
    // </div>

    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-6 grid-rows-9 gap-4">
        <div className="col-span-4 gap-y-8 flex flex-col row-span-3">
          <DashboardHeader />
          <DashboardSummarySection className="flex-1" />
        </div>
        <div className="col-span-2 row-span-5 col-start-5">
          <DashboardProjectDeadlineSection />
        </div>
        <div className="col-span-4 row-span-6 row-start-4">
          <DashboardYearToDateGrowthSection />
        </div>
        <div className="col-span-2 row-span-4 col-start-5 row-start-6">
          <DashboardActiveUserSection />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <DashboardRegisterationAndCompletedProjectDisplaySection />
        </div>
        <div className="col-span-2">
          <DashboardProjectStatusSection />
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-4">
          <DashboardPopularSection />
        </div>
        <div className="col-span-2">
          <DashboardTechStack />
        </div>
      </div>
    </div>
  );
}

export default DashboardContainer;

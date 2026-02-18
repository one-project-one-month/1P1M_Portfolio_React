import useEventSource from '@/hooks/use-event-source';
import { useEffect, useState } from 'react';

function useDashboard() {
  const { addListener, removeListener } = useEventSource(
    '/portfolio/api/v1/dashboard',
  );

  // ---- states ----
  const [connectedMessage, setConnectedMessage] = useState<string | null>(null);
  const [completeMessage, setCompleteMessage] = useState<string | null>(null);

  const [projectDeadlines, setProjectDeadlines] = useState(null);
  const [inactiveUsers, setInactiveUsers] = useState(null);
  const [projectStatus, setProjectStatus] = useState(null);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [popularData, setPopularData] = useState(null);
  const [roleDistribution, setRoleDistribution] = useState(null);
  const [yearToDateGrowth, setYearToDateGrowth] = useState(null);
  const [
    registrationsAndCompletedProjects,
    setRegistrationsAndCompletedProjects,
  ] = useState(null);

  const parse = (e: MessageEvent) => JSON.parse(e.data);

  useEffect(() => {
    // ---- string events ----
    const connectedHandler = (e: MessageEvent) => setConnectedMessage(e.data);

    const completeHandler = (e: MessageEvent) => setCompleteMessage(e.data);

    const projectDeadlinesHandler = (e: MessageEvent) =>
      setProjectDeadlines(parse(e));

    const inactiveUsersHandler = (e: MessageEvent) =>
      setInactiveUsers(parse(e));

    const projectStatusHandler = (e: MessageEvent) =>
      setProjectStatus(parse(e));

    const dashboardSummaryHandler = (e: MessageEvent) =>
      setDashboardSummary(parse(e));

    const popularHandler = (e: MessageEvent) => setPopularData(parse(e));

    const roleDistributionHandler = (e: MessageEvent) =>
      setRoleDistribution(parse(e));

    const yearToDateGrowthHandler = (e: MessageEvent) =>
      setYearToDateGrowth(parse(e));

    const registrationsHandler = (e: MessageEvent) =>
      setRegistrationsAndCompletedProjects(parse(e));

    addListener('connected', connectedHandler);
    addListener('complete', completeHandler);

    addListener('projectDeadlines', projectDeadlinesHandler);
    addListener('inactiveUsers', inactiveUsersHandler);
    addListener('projectStatus', projectStatusHandler);
    addListener('dashboardSummary', dashboardSummaryHandler);
    addListener('popularPortfolioAndProjectIdeas', popularHandler);
    addListener('roleDistributionAndTechStack', roleDistributionHandler);
    addListener('yearToDateGrowth', yearToDateGrowthHandler);
    addListener('registrationsAndCompletedProjects', registrationsHandler);

    return () => {
      removeListener('connected', connectedHandler);
      removeListener('complete', completeHandler);

      removeListener('projectDeadlines', projectDeadlinesHandler);
      removeListener('inactiveUsers', inactiveUsersHandler);
      removeListener('projectStatus', projectStatusHandler);
      removeListener('dashboardSummary', dashboardSummaryHandler);
      removeListener('popularPortfolioAndProjectIdeas', popularHandler);
      removeListener('roleDistributionAndTechStack', roleDistributionHandler);
      removeListener('yearToDateGrowth', yearToDateGrowthHandler);
      removeListener('registrationsAndCompletedProjects', registrationsHandler);
    };
  }, [addListener, removeListener]);

  return {
    connectedMessage,
    completeMessage,
    projectDeadlines,
    inactiveUsers,
    projectStatus,
    dashboardSummary,
    popularData,
    roleDistribution,
    yearToDateGrowth,
    registrationsAndCompletedProjects,
  };
}

export default useDashboard;

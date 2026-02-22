import { useCallback, useState } from 'react';
import CustomMiniTable, { type Column } from './common/custom-mini-table';
import SwitchBar from './common/switch-bar';

type ProjectOverviewRow = {
  projectName: string;
  projectLeader: string;
  member: number;
  status: string;
  progress: string;
};

type ProjectSubmissionRow = {
  projectName: string;
  submitter: string;
  react: 'Yes' | 'No';
  projectType: string;
};

const overviewColumns: Column<ProjectOverviewRow>[] = [
  { key: 'projectName', header: 'Project Name' },
  { key: 'projectLeader', header: 'Project Leader' },
  { key: 'member', header: 'Member' },
  { key: 'status', header: 'Status' },
  { key: 'progress', header: 'Progress' },
];

const submissionColumns: Column<ProjectSubmissionRow>[] = [
  { key: 'projectName', header: 'Project Name' },
  { key: 'submitter', header: 'Submitter' },
  { key: 'react', header: 'React' },
  { key: 'projectType', header: 'Project Type' },
];

type DashboardPopularSectionProps = {
  data: {
    data: {
      popularPortfolios: ProjectOverviewRow;
      popularProjects: ProjectSubmissionRow[];
    };
  } | null;
};

function DashboardPopularSection({ data }: DashboardPopularSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const portfolios = data ? [{ ...data.data.popularPortfolios }] : [];
  const projects = data?.data.popularProjects ?? [];

  const handleContentChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className="custom-card flex flex-col">
      <SwitchBar
        options={['Popular Portfolio', 'Popular Project Ideas']}
        onChange={handleContentChange}
      />

      {selectedIndex === 0 && (
        <CustomMiniTable<ProjectOverviewRow>
          className="mt-4 flex-1"
          columns={overviewColumns}
          data={portfolios}
        />
      )}

      {selectedIndex === 1 && (
        <CustomMiniTable<ProjectSubmissionRow>
          className="mt-4 flex-1"
          columns={submissionColumns}
          data={projects}
        />
      )}
    </div>
  );
}

export default DashboardPopularSection;

import { useCallback, useState } from 'react';
import CustomMiniTable from './common/custom-mini-table';
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

const columns = [
  [
    { key: 'projectName', header: 'Project Name' },
    { key: 'projectLeader', header: 'Project Leader' },
    { key: 'member', header: 'Member' },
    { key: 'status', header: 'Status' },
    { key: 'progress', header: 'Progress' },
  ],
  [
    { key: 'projectName', header: 'Project Name' },
    { key: 'submitter', header: 'Submitter' },
    { key: 'react', header: 'React' },
    { key: 'projectType', header: 'Project Type' },
  ],
];

const data: [ProjectOverviewRow[], ProjectSubmissionRow[]] = [
  [
    {
      projectName: 'OPOM Dashboard',
      projectLeader: 'Alice Johnson',
      member: 6,
      status: 'Active',
      progress: '72%',
    },
    {
      projectName: 'Analytics Revamp',
      projectLeader: 'Brian Lee',
      member: 4,
      status: 'Completed',
      progress: '100%',
    },
    {
      projectName: 'CRM Redesign',
      projectLeader: 'Catherine Kim',
      member: 5,
      status: 'Pending',
      progress: '45%',
    },
    {
      projectName: 'Mobile App MVP',
      projectLeader: 'Daniel Park',
      member: 3,
      status: 'Active',
      progress: '61%',
    },
    {
      projectName: 'Internal Tools',
      projectLeader: 'Emily Stone',
      member: 8,
      status: 'On Hold',
      progress: '30%',
    },
  ],
  [
    {
      projectName: 'OPOM Dashboard',
      submitter: 'Jason Miller',
      react: 'Yes',
      projectType: 'Web App',
    },
    {
      projectName: 'Analytics Revamp',
      submitter: 'Sophia Brown',
      react: 'Yes',
      projectType: 'Dashboard',
    },
    {
      projectName: 'CRM Redesign',
      submitter: 'Michael Chen',
      react: 'No',
      projectType: 'System',
    },
    {
      projectName: 'Mobile App MVP',
      submitter: 'Olivia Wilson',
      react: 'Yes',
      projectType: 'Mobile',
    },
    {
      projectName: 'Internal Tools',
      submitter: 'Ethan Davis',
      react: 'No',
      projectType: 'Internal Tool',
    },
  ],
];

function DashboardPopularSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleContentChange = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className="custom-card flex flex-col">
      <SwitchBar
        options={['Popular Portfolio', 'Popular Project Ideas']}
        onChange={handleContentChange}
      />

      <CustomMiniTable
        className="mt-4 flex-1"
        columns={columns[selectedIndex]}
        data={data[selectedIndex]}
      />
    </div>
  );
}

export default DashboardPopularSection;

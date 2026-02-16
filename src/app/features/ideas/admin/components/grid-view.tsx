import { IdeaGrid } from '../../shared/components';
import type { IdeaType } from '../../shared/types/project-idea.types';

const IdeaManagementGrid = ({
  data,
}: {
  data: (IdeaType & { isAlreadyReacted: boolean })[];
}) => {
  return <IdeaGrid site="admin" data={data} />;
};

export default IdeaManagementGrid;

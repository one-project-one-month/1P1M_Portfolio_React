import { IdeaGrid } from '../../shared/components';
import type { IdeaType } from '../../shared/types/project-idea.types';

type Props = {
  isLoading?: boolean;
  data: IdeaType[];
};

const IdeaList = ({ data, isLoading = false }: Props) => {
  return <IdeaGrid site="client" data={data} isLoading={isLoading} />;
};

export default IdeaList;

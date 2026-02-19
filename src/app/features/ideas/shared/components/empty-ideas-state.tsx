import { LightbulbOff } from 'lucide-react';

type Props = {
  message?: string;
};

const EmptyIdeasState = ({ message = 'No project ideas found' }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] py-20 text-muted-foreground">
      <LightbulbOff size={48} className="mb-4 opacity-50" />
      <p className="text-lg font-medium text-slate-400">{message}</p>
    </div>
  );
};

export default EmptyIdeasState;

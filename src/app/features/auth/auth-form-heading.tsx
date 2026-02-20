import { opomIconUrl } from '@/assets/icons/iconUrls';
import { useAppNavigation } from '@/hooks/use-app-navigate';

type Props = {
  title: string;
  desc: string;
};

export default function AuthFormHeading({ title, desc }: Props) {
  const { goTo } = useAppNavigation();

  return (
    <div className="text-white flex flex-col items-center justify-center gap-y-6 text-center">
      <img
        src={opomIconUrl}
        alt="Company Logo"
        className="cursor-pointer h-10 transition-transform active:scale-95 hover:scale-105 duration-200"
        onClick={() => goTo('/')}
      />
      <div className="space-y-2">
        <h1 className="font-sans font-bold text-2xl leading-tight">{title}</h1>
        <p className="font-sans text-sm md:text-base text-gray-400 max-w-md mx-auto leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

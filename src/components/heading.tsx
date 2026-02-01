import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import type { UserInfo } from '@/store/user-info-store';
import { Bell } from 'lucide-react';

type HeadingProps = {
  user: UserInfo | null;
};

const Heading = ({ user }: HeadingProps) => {
  return (
    <div className="bg-[#0F172B] p-2 gap-x-2 flex items-center text-white ">
      <div className="flex-1"></div>

      <div className="flex items-center gap-x-5 self-end pe-1.5">
        <Bell />
        <img src={sampleUserImgUrl} className="size-10 rounded-full" />
        <span className="font-medium">{user?.username ?? 'User'}</span>
      </div>
    </div>
  );
};

export default Heading;

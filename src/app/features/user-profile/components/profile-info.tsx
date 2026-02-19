import { Mail, Phone, Send } from 'lucide-react';
import type { DevProfileType } from '../types/user-profile.type';
import { ContactInfoItem } from './contact-info-item';

interface ProfileInfoProps {
  devProfile: DevProfileType;
  onCopy: (text: string) => void;
}

export const ProfileInfo = ({ devProfile, onCopy }: ProfileInfoProps) => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <h3 className="text-white font-bold text-xl md:text-2xl wrap-break-word">
        {devProfile?.name}
      </h3>

      <div className="flex gap-2 md:gap-4 items-center flex-wrap">
        {devProfile.techStacks.map((stack) => (
          <span
            key={stack}
            className="text-gray-400 text-xs md:text-sm capitalize border border-gray-400 rounded-lg px-3 md:px-6 py-1 bg-slate-800"
          >
            {stack}
          </span>
        ))}
      </div>

      <ContactInfoItem icon={Mail} value={devProfile?.email} onCopy={onCopy} />

      <ContactInfoItem icon={Phone} value={devProfile?.phone} onCopy={onCopy} />

      <ContactInfoItem
        icon={Send}
        value={devProfile?.telegramUsername}
        onCopy={onCopy}
      />

      <p className="text-muted mt-4">
        {devProfile?.aboutDev || 'No bio available'}
      </p>
    </div>
  );
};

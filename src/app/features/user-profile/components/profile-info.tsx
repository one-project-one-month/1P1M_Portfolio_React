import { Mail, Phone, Send } from 'lucide-react';
import type { DevProfileType } from '../types/user-profile.type';
import { ContactInfoItem } from './contact-info-item';

interface ProfileInfoProps {
  devProfile: DevProfileType;
  onCopy: (text: string) => void;
}

export const ProfileInfo = ({ devProfile, onCopy }: ProfileInfoProps) => {
  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-white font-bold text-2xl">{devProfile?.name}</h3>

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

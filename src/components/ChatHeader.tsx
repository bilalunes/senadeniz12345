import { FC } from 'react';
import { Avatar } from './Avatar';

interface ChatHeaderProps {
  avatar: string;
  name: string;
  isOnline: boolean;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ avatar, name, isOnline }) => {
  return (
    <div className="bg-[#f0f2f5] px-4 py-2 flex items-center border-b">
      <div className="flex items-center flex-1">
        <Avatar imageUrl={avatar} name={name} size="md" />
        <div className="ml-3">
          <h2 className="font-semibold text-gray-900">{name}</h2>
          <p className="text-sm text-gray-500">
            {isOnline ? 'çevrimiçi' : 'çevrimdışı'}
          </p>
        </div>
      </div>
    </div>
  );
};
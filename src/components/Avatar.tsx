import { FC } from 'react';

interface AvatarProps {
  imageUrl: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Avatar: FC<AvatarProps> = ({ imageUrl, name, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-pink-200`}>
      <img
        src={imageUrl}
        alt={`${name}'s avatar`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
import { FC } from 'react';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  imageUrl?: string;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message, isUser, imageUrl }) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-[#dcf8c6] text-gray-800'
            : 'bg-white text-gray-800'
        }`}
      >
        {imageUrl && (
          <div className="mb-2">
            <img 
              src={imageUrl} 
              alt="Shared photo"
              className="rounded-lg w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}
        <p className="break-words">{message}</p>
      </div>
    </div>
  );
};
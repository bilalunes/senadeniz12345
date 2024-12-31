import { FC } from 'react';
import { Message } from '../types/chat';

interface ChatHistoryProps {
  selectedUser: string | null;
  chatHistory: Record<string, Message[]>;
}

export const ChatHistory: FC<ChatHistoryProps> = ({ selectedUser, chatHistory }) => {
  if (!selectedUser) {
    return (
      <div className="text-gray-500 text-center">
        Kullanıcı seçin
      </div>
    );
  }

  const messages = chatHistory[selectedUser] || [];

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Sohbet Geçmişi</h2>
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              message.isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[70%]`}
          >
            {message.imageUrl && (
              <img
                src={message.imageUrl}
                alt="Shared"
                className="rounded-lg mb-2 max-w-full"
              />
            )}
            <div>{message.text}</div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(message.timestamp!).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
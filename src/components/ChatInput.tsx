import { FC, FormEvent, useState, useRef } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onPhotoSend: (file: File) => void;
}

export const ChatInput: FC<ChatInputProps> = ({ onSend, onPhotoSend }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage('');
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoSend(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#f0f2f5] px-4 py-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handlePhotoClick}
          className="text-gray-500 hover:text-gray-700 p-2"
        >
          📷
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="hidden"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesaj yazın"
          className="flex-1 rounded-full px-4 py-2 bg-white border-none focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <button
          type="submit"
          className="text-gray-500 hover:text-gray-700 p-2"
          disabled={!message.trim()}
        >
          ➤
        </button>
      </div>
    </form>
  );
};
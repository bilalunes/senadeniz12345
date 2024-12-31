import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoginForm } from './components/LoginForm';
import { AdminPanel } from './components/AdminPanel';
import { ChatHeader } from './components/ChatHeader';
import { handleMessage } from './utils/chat/messageHandler';
import { Message, UserInfo } from './types/chat';
import { getTypingDelay } from './utils/chat/messageDelay';
import { saveUser, saveChatHistory } from './utils/storage';
import { SENA_INFO } from './utils/constants';
import { v4 as uuidv4 } from 'uuid';

export function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const path = window.location.pathname;
    setIsAdmin(path === '/admin');
  }, []);

  useEffect(() => {
    if (userInfo && messages.length > 0) {
      saveChatHistory({
        userId: userInfo.id,
        messages: messages.map(m => ({
          ...m,
          timestamp: new Date().toISOString()
        }))
      });
    }
  }, [messages, userInfo]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogin = (name: string, phone: string) => {
    const userId = uuidv4();
    const userData = {
      id: userId,
      name,
      phone,
      createdAt: new Date().toISOString()
    };
    
    saveUser(userData);
    setUserInfo(userData);
    setMessages([{ text: SENA_INFO.greeting, isUser: false }]);
  };

  const handleSend = (message: string) => {
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setIsTyping(true);

    const response = handleMessage(message, messages);
    const delay = getTypingDelay(response.text);

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: response.text, 
        isUser: false,
        imageUrl: response.imageUrl 
      }]);
      setIsTyping(false);
    }, delay);
  };

  const handlePhotoSend = async (file: File) => {
    setMessages(prev => [...prev, {
      text: "Fotoğraf gönderildi",
      isUser: true,
      imageUrl: URL.createObjectURL(file)
    }]);

    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Çok güzel bir fotoğraf! 😍",
        isUser: false
      }]);
      setIsTyping(false);
    }, 1500);
  };

  if (isAdmin) {
    return <AdminPanel />;
  }

  if (!userInfo) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#efeae2] flex justify-center">
      <div className="w-full max-w-2xl bg-white flex flex-col h-screen">
        <ChatHeader 
          avatar={SENA_INFO.avatar}
          name={SENA_INFO.name}
          isOnline={true}
        />
        
        <div className="flex-1 overflow-y-auto bg-[#e5ddd5] p-4">
          <div className="space-y-2">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.text}
                isUser={message.isUser}
                imageUrl={message.imageUrl}
              />
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <div className="bg-white rounded-full px-4 py-2">
                  yazıyor...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <ChatInput onSend={handleSend} onPhotoSend={handlePhotoSend} />
      </div>
    </div>
  );
}
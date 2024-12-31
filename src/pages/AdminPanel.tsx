import { FC, useState, useEffect } from 'react';
import { getUsers, getChatHistory, checkAdminCredentials } from '../utils/storage';
import { UserInfo } from '../types/chat';
import { AdminLogin } from '../components/AdminLogin';
import { ChatHistory } from '../components/ChatHistory';
import { UserList } from '../components/UserList';

export const AdminPanel: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (isAuthenticated) {
      setUsers(getUsers());
      setChatHistory(getChatHistory());
    }
  }, [isAuthenticated]);

  const handleLogin = (username: string, password: string) => {
    if (checkAdminCredentials(username, password)) {
      setIsAuthenticated(true);
    } else {
      alert('Geçersiz kullanıcı adı veya şifre!');
    }
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h1>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 border-r pr-6">
            <UserList 
              users={users}
              selectedUser={selectedUser}
              onSelectUser={setSelectedUser}
            />
          </div>
          
          <div className="col-span-2">
            <ChatHistory 
              selectedUser={selectedUser}
              chatHistory={chatHistory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
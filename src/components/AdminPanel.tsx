import { FC, useState, useEffect } from 'react';
import { getUsers, getChatHistory, checkAdminCredentials } from '../utils/storage';
import { deleteChatHistory, deleteAllChatHistory } from '../utils/storage/chatStorage';
import { deleteUser, deleteAllUsers } from '../utils/storage/userStorage';
import { UserInfo } from '../types/chat';
import { AdminLogin } from './AdminLogin';
import { DeleteConfirmModal } from './DeleteConfirmModal';

export const AdminPanel: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<string, any[]>>({});
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    type: 'single' | 'all';
    userId?: string;
  }>({ isOpen: false, type: 'single' });

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    setUsers(getUsers());
    setChatHistory(getChatHistory());
  };

  const handleLogin = (username: string, password: string) => {
    if (checkAdminCredentials(username, password)) {
      setIsAuthenticated(true);
    } else {
      alert('Geçersiz kullanıcı adı veya şifre!');
    }
  };

  const handleDeleteUser = (userId: string) => {
    setDeleteModal({
      isOpen: true,
      type: 'single',
      userId
    });
  };

  const handleDeleteAllUsers = () => {
    setDeleteModal({
      isOpen: true,
      type: 'all'
    });
  };

  const handleConfirmDelete = () => {
    if (deleteModal.type === 'single' && deleteModal.userId) {
      // Delete both user and their chat history
      deleteUser(deleteModal.userId);
      deleteChatHistory(deleteModal.userId);
      if (selectedUser === deleteModal.userId) {
        setSelectedUser(null);
      }
    } else if (deleteModal.type === 'all') {
      // Delete all users and chat histories
      deleteAllUsers();
      deleteAllChatHistory();
      setSelectedUser(null);
    }
    
    loadData();
    setDeleteModal({ isOpen: false, type: 'single' });
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          <button
            onClick={handleDeleteAllUsers}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Tüm Kullanıcıları Sil
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-1 border-r pr-6">
            <h2 className="text-lg font-semibold mb-4">Kullanıcılar</h2>
            <div className="space-y-2">
              {users.map(user => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user.id)}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedUser === user.id ? 'bg-blue-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.phone}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteUser(user.id);
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4">Sohbet Geçmişi</h2>
            {selectedUser && chatHistory[selectedUser] ? (
              <div className="space-y-4">
                {chatHistory[selectedUser].map((message: any, index: number) => (
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
                      {new Date(message.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-500 text-center">
                Kullanıcı seçin
              </div>
            )}
          </div>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, type: 'single' })}
        onConfirm={handleConfirmDelete}
        title={deleteModal.type === 'single' ? 'Kullanıcıyı Sil' : 'Tüm Kullanıcıları Sil'}
        message={
          deleteModal.type === 'single'
            ? 'Bu kullanıcıyı ve tüm sohbet geçmişini silmek istediğinizden emin misiniz?'
            : 'Tüm kullanıcıları ve sohbet geçmişlerini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!'
        }
      />
    </div>
  );
};
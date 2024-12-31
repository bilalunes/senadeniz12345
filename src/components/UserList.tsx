import { FC } from 'react';
import { UserInfo } from '../types/chat';

interface UserListProps {
  users: UserInfo[];
  selectedUser: string | null;
  onSelectUser: (userId: string) => void;
}

export const UserList: FC<UserListProps> = ({ users, selectedUser, onSelectUser }) => {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4">Kullanıcılar</h2>
      <div className="space-y-2">
        {users.map(user => (
          <div
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`p-3 rounded-lg cursor-pointer ${
              selectedUser === user.id ? 'bg-blue-100' : 'hover:bg-gray-100'
            }`}
          >
            <div className="font-medium">{user.name}</div>
            <div className="text-sm text-gray-600">{user.phone}</div>
            <div className="text-xs text-gray-500">
              {new Date(user.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
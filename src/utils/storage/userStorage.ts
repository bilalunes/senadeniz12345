import { UserInfo } from '../../types/chat';
import { STORAGE_KEYS } from '../constants/storage';

export function saveUser(user: UserInfo): void {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export function getUsers(): UserInfo[] {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
}

export function deleteUser(userId: string): void {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== userId);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(filteredUsers));
}

export function deleteAllUsers(): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
}
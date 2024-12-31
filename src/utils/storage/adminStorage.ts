import { STORAGE_KEYS } from '../constants/storage';

export function checkAdminCredentials(username: string, password: string): boolean {
  const adminData = localStorage.getItem(STORAGE_KEYS.ADMIN);
  if (!adminData) return false;
  
  const admin = JSON.parse(adminData);
  return admin.username === username && admin.password === password;
}
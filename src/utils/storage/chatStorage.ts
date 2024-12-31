import { ChatHistory } from '../../types/admin';
import { STORAGE_KEYS } from '../constants/storage';

export function saveChatHistory(data: ChatHistory): void {
  const history = getChatHistory();
  history[data.userId] = data.messages;
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history));
}

export function getChatHistory(): Record<string, any[]> {
  const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
  return data ? JSON.parse(data) : {};
}

export function deleteChatHistory(userId: string): void {
  const history = getChatHistory();
  delete history[userId];
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history));
}

export function deleteAllChatHistory(): void {
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify({}));
}
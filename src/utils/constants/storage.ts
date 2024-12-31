// Export the storage keys constant
export const STORAGE_KEYS = {
  USERS: 'chat_users',
  CHAT_HISTORY: 'chat_history',
  ADMIN: 'admin_credentials'
} as const;

// Export types for better type safety
export type StorageKey = keyof typeof STORAGE_KEYS;
import { Message } from '../../types/chat';

export interface MessageContext {
  lastUserMessage?: string;
  messageHistory: Message[];
  topics: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  intent: 'question' | 'statement' | 'greeting' | 'flirt' | 'unknown';
  keywords: string[];
}
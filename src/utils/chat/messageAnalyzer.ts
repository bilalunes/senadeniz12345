import { Message } from '../../types/chat';
import { MessageContext } from './messageContext';
import { extractKeywords } from './textAnalysis';

export function analyzeMessage(message: string, history: Message[]): MessageContext {
  const lowerMessage = message.toLowerCase();
  
  return {
    lastUserMessage: history.findLast(m => m.isUser)?.text,
    messageHistory: history,
    topics: extractTopics(lowerMessage),
    sentiment: analyzeSentiment(lowerMessage),
    intent: detectIntent(lowerMessage),
    keywords: extractKeywords(lowerMessage)
  };
}

function extractTopics(message: string): string[] {
  const topics = [];
  
  if (message.match(/okul|ders|sınav/)) topics.push('school');
  if (message.match(/müzik|şarkı/)) topics.push('music');
  if (message.match(/film|dizi/)) topics.push('entertainment');
  
  return topics;
}

function analyzeSentiment(message: string): 'positive' | 'neutral' | 'negative' {
  if (message.match(/güzel|harika|süper/)) return 'positive';
  if (message.match(/kötü|üzgün/)) return 'negative';
  return 'neutral';
}

function detectIntent(message: string): 'question' | 'statement' | 'greeting' | 'flirt' | 'unknown' {
  if (message.includes('?')) return 'question';
  if (message.match(/^(merhaba|selam|hey)/)) return 'greeting';
  if (message.match(/seviyorum|aşk|güzelsin/)) return 'flirt';
  return 'statement';
}
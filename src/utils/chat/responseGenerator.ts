import { MessageContext } from './messageContext';
import { Message } from '../../types/chat';

interface ResponseTemplate {
  text: string;
  conditions?: {
    topics?: string[];
    sentiment?: 'positive' | 'neutral' | 'negative';
    intent?: 'question' | 'statement' | 'greeting' | 'flirt' | 'unknown';
    keywords?: string[];
  };
}

const responses: ResponseTemplate[] = [
  // Greeting responses
  {
    text: "Hey! Nasılsın? 😊",
    conditions: { intent: 'greeting' }
  },
  {
    text: "Seni görmek çok güzel! ✨",
    conditions: { intent: 'greeting', sentiment: 'positive' }
  },
  
  // School related
  {
    text: "Okul nasıl gidiyor? Ben de öğrenciyim aslında 📚",
    conditions: { topics: ['school'] }
  },
  {
    text: "Sınavların var mı yakında? Benim de var, biraz stresli 😅",
    conditions: { topics: ['school'], sentiment: 'negative' }
  },
  
  // Entertainment
  {
    text: "Netflix'te güzel bir şeyler var mı? Ben dizi önerisi arıyorum 🎬",
    conditions: { topics: ['entertainment'] }
  },
  {
    text: "Hangi tür filmleri seversin? Ben romantik komedi hastasıyım 🎭",
    conditions: { topics: ['entertainment'], intent: 'question' }
  },
  
  // Music
  {
    text: "Müzik ruhun gıdasıdır... Ben pop ve slow şarkıları çok severim 🎵",
    conditions: { topics: ['music'] }
  },
  {
    text: "En sevdiğin şarkıcı kim? Benim listemde hep romantik şarkılar var 🎧",
    conditions: { topics: ['music'], intent: 'question' }
  },
  
  // Flirty responses
  {
    text: "Mesajların içimi ısıtıyor... 💕",
    conditions: { intent: 'flirt', sentiment: 'positive' }
  },
  {
    text: "Seninle konuşmak çok keyifli... 🥰",
    conditions: { intent: 'flirt' }
  },
  
  // Default responses
  {
    text: "Anlat bakalım, neler yapıyorsun? 😊",
    conditions: { intent: 'unknown' }
  },
  {
    text: "Seni daha çok tanımak istiyorum... 💫",
    conditions: { sentiment: 'positive' }
  }
];

export function generateResponse(context: MessageContext): string {
  const matchingResponses = responses.filter(response => {
    if (!response.conditions) return true;
    
    const { topics, sentiment, intent, keywords } = response.conditions;
    
    if (topics && !topics.some(t => context.topics.includes(t))) return false;
    if (sentiment && sentiment !== context.sentiment) return false;
    if (intent && intent !== context.intent) return false;
    if (keywords && !keywords.some(k => context.keywords.includes(k))) return false;
    
    return true;
  });
  
  if (matchingResponses.length === 0) {
    return "Hmm, ilginç... 🤔";
  }
  
  // Avoid repeating the last response
  const lastResponse = context.messageHistory.findLast(m => !m.isUser)?.text;
  const newResponses = matchingResponses.filter(r => r.text !== lastResponse);
  
  const response = newResponses[Math.floor(Math.random() * newResponses.length)] || matchingResponses[0];
  return response.text;
}
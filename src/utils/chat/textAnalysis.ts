// Text analysis utilities
const stopWords = new Set([
  've', 'veya', 'ile', 'de', 'da', 'bir', 'bu', 'şu', 'için',
  'gibi', 'kadar', 'sonra', 'önce', 'bana', 'sana', 'beni', 'seni'
]);

export function extractKeywords(text: string): string[] {
  const words = text.toLowerCase()
    .replace(/[.,!?]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
  
  return Array.from(new Set(words)); // Remove duplicates
}

export function calculateMessageSimilarity(msg1: string, msg2: string): number {
  const keywords1 = new Set(extractKeywords(msg1));
  const keywords2 = new Set(extractKeywords(msg2));
  
  const intersection = new Set([...keywords1].filter(x => keywords2.has(x)));
  const union = new Set([...keywords1, ...keywords2]);
  
  return intersection.size / union.size;
}

export function isMessageRepetitive(newMessage: string, previousMessages: string[]): boolean {
  return previousMessages.some(msg => 
    calculateMessageSimilarity(newMessage, msg) > 0.8
  );
}
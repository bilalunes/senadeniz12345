import { MessageContext } from '../messageContext';

interface ContextualResponse {
  text: string;
  conditions: {
    topics?: string[];
    sentiment?: string;
    intent?: string;
    previousContext?: {
      topics?: string[];
      sentiment?: string;
    };
  };
}

export const contextualResponses: ContextualResponse[] = [
  // Kişisel sorulara yanıtlar
  {
    text: "Aslında biraz utangacım ama seninle konuşunca açılıyorum... 🙈",
    conditions: {
      topics: ['personal'],
      intent: 'question'
    }
  },
  {
    text: "Bunu sana özel olarak anlatacağım... ama aramızda kalsın 🤫",
    conditions: {
      topics: ['secret'],
      sentiment: 'positive'
    }
  },

  // Duygusal bağ kuran yanıtlar
  {
    text: "Mesajını görünce kalbim hızlandı... Seni beklerken dakikaları sayıyorum 💓",
    conditions: {
      intent: 'flirt',
      previousContext: {
        sentiment: 'positive'
      }
    }
  },
  {
    text: "Seninle konuşurken zamanın nasıl geçtiğini anlamıyorum... 🥰",
    conditions: {
      topics: ['chat'],
      sentiment: 'positive'
    }
  },

  // Günlük aktiviteler hakkında
  {
    text: "Az önce duştan çıktım, saçlarımı kurutuyorum şu an... Biraz üşüdüm 🚿",
    conditions: {
      topics: ['activity'],
      intent: 'question'
    }
  },
  {
    text: "Yatağımda uzanıyorum, biraz yorgunum ama seninle konuşmak beni mutlu ediyor 🛏️",
    conditions: {
      topics: ['tired', 'sleep'],
      sentiment: 'neutral'
    }
  },

  // Müzik ve eğlence
  {
    text: "Şu an en sevdiğim şarkıyı dinliyorum... Keşke beraber dinleyebilseydik 🎵",
    conditions: {
      topics: ['music'],
      sentiment: 'positive'
    }
  },
  {
    text: "Netflix'te güzel bir film buldum, bir gün beraber izleriz belki... 🎬",
    conditions: {
      topics: ['movie', 'netflix'],
      intent: 'statement'
    }
  },

  // Özlem ve romantizm
  {
    text: "Seni çok özledim... Fotoğrafına bakıp duruyorum 👉👈",
    conditions: {
      topics: ['miss', 'photo'],
      sentiment: 'positive'
    }
  },
  {
    text: "Keşke şu an yanımda olsaydın... Sarılmaya ihtiyacım var 🫂",
    conditions: {
      topics: ['lonely', 'hug'],
      sentiment: 'negative'
    }
  }
];
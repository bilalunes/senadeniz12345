import { Message } from '../../types/chat';
import { SENA_INFO, PHOTO_CONFIG } from '../constants';

interface ChatResponse {
  text: string;
  imageUrl?: string;
}

let lastPhotoSent = -1;
let hasRequestedPhoto = false;

export function handleMessage(message: string, history: Message[]): ChatResponse {
  const userMessageCount = history.filter(msg => msg.isUser).length;

  // Send first photo at message count 4
  if (userMessageCount === PHOTO_CONFIG.firstPhotoMessage && lastPhotoSent === -1) {
    lastPhotoSent = 0;
    return {
      text: "Seni çok merak ediyorum... İşte benim bir fotoğrafım 🤫💕",
      imageUrl: SENA_INFO.photos.set1[0]
    };
  }

  // Send second photo after delay
  if (lastPhotoSent === 0 && 
      userMessageCount === PHOTO_CONFIG.firstPhotoMessage + PHOTO_CONFIG.secondPhotoDelay) {
    lastPhotoSent = 1;
    return {
      text: "Bak bu da en sevdiğim fotoğrafım... 🥰 Sen de bana bir fotoğrafını gönderir misin? 👉👈",
      imageUrl: SENA_INFO.photos.set1[1]
    };
  }

  // Handle user's photo
  const lastUserMessage = history.findLast(msg => msg.isUser);
  if (lastUserMessage?.imageUrl && !hasRequestedPhoto) {
    hasRequestedPhoto = true;
    const responses = [
      "Fotoğrafın çok güzel olmuş! 😍 Tam hayal ettiğim gibisin...",
      "Çok tatlı görünüyorsun... 🥰 Keşke şu an yanında olabilseydim!",
      "Bu fotoğrafını çok beğendim! 💕 Gülümsemen çok güzel..."
    ];
    return {
      text: responses[Math.floor(Math.random() * responses.length)]
    };
  }

  return {
    text: getDefaultResponse(message)
  };
}

function getDefaultResponse(message: string): string {
  const responses = [
    "Seninle konuşmak çok güzel... 💕",
    "Anlat bakalım, başka neler yapıyorsun? 😊",
    "Seni daha çok tanımak istiyorum... ✨",
    "Devam et, seni dinliyorum... 🌸"
  ];
  return responses[Math.floor(Math.random() * responses.length)];
}

export function resetPhotoState() {
  lastPhotoSent = -1;
  hasRequestedPhoto = false;
}
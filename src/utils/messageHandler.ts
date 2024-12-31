import { MessageContext } from './messageAnalyzer';
import { ConversationState } from './conversationState';
import { SENA_INFO } from './constants';
import { getResponse } from './responses';

interface ChatResponse {
  text: string;
  imageUrl?: string;
}

let lastPhotoSent = 0;
let hasRequestedPhoto = false;

export function handleMessage(
  message: string,
  context: MessageContext,
  state: ConversationState
): ChatResponse {
  if (state.messageCount === 4) {
    lastPhotoSent = state.messageCount;
    return {
      text: "Seni çok merak ediyorum... İşte benim bir fotoğrafım 🤫💕",
      imageUrl: SENA_INFO.photos[0]
    };
  }

  if (lastPhotoSent > 0 && state.messageCount === lastPhotoSent + 2 && !hasRequestedPhoto) {
    hasRequestedPhoto = true;
    return {
      text: "Bak bu da en sevdiğim fotoğrafım... 🥰 Sen de bana bir fotoğrafını gönderir misin? 👉👈",
      imageUrl: SENA_INFO.photos[1]
    };
  }

  return {
    text: getResponse(message, context, state)
  };
}

export function resetPhotoState() {
  lastPhotoSent = 0;
  hasRequestedPhoto = false;
}
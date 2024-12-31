import { MessageContext } from './chat/messageAnalyzer';
import { ConversationState } from './chat/conversationState';
import { getResponse as generateResponse } from './chat/responses/responseGenerator';

export function getResponse(
  message: string,
  context: MessageContext,
  state: ConversationState
): string {
  return generateResponse(message, context, state);
}
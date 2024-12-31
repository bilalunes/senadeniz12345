import { MessageContext } from './messageAnalyzer';
import { ConversationState } from './conversationState';
import { initialResponses } from './responses/initialResponses';
import { intimateResponses } from './responses/intimateResponses';
import { warmingResponses } from './responses/warmingResponses';

export function getResponse(
  _message: string,
  context: MessageContext,
  state: ConversationState
): string {
  if (context.hasCompliment) {
    return handleCompliment(state.stage);
  }

  if (context.questionType) {
    return handleQuestion(context.questionType, state.stage);
  }

  return getStageResponse(state.stage);
}

function handleCompliment(stage: string): string {
  const responses = {
    initial: [
      "Teşekkür ederim, utandım şimdi ☺️",
      "Çok naziksin... 🌸",
      "Sen de çok tatlısın 💫"
    ],
    intimate: [
      "Böyle şeyler söyleyince kalbim hızlanıyor 💓",
      "Seninle konuşunca kendimi özel hissediyorum ✨",
      "Beni mutlu ediyorsun... 🥰"
    ]
  };

  const stageResponses = responses[stage as keyof typeof responses] || responses.initial;
  return stageResponses[Math.floor(Math.random() * stageResponses.length)];
}

function handleQuestion(type: string, stage: string): string {
  if (type === 'intimate' && stage !== 'intimate') {
    return "Biraz erken değil mi? Önce tanışalım... 🙈";
  }

  const responses = {
    personal: [
      "İlginç bir soru... Düşüneyim 🤔",
      "Bunu sana özel olarak anlatacağım 💫",
      "Güzel soru, seninle paylaşmak isterim ✨"
    ],
    casual: [
      "Hmm, dur düşüneyim 💭",
      "İlginç bir bakış açın var 🌟",
      "Bu soruyu sevdim 😊"
    ],
    intimate: [
      "Bu soru heyecanlandırdı beni... 💕",
      "Sana özel cevap vereceğim... 🤫",
      "Biraz utandım şimdi... 🙈"
    ]
  };

  const typeResponses = responses[type as keyof typeof responses] || responses.casual;
  return typeResponses[Math.floor(Math.random() * typeResponses.length)];
}

function getStageResponse(stage: string): string {
  const responses = {
    initial: initialResponses,
    warming: warmingResponses,
    intimate: intimateResponses
  };

  const stageResponses = responses[stage as keyof typeof responses] || responses.initial;
  const allResponses = [...stageResponses.greeting, ...stageResponses.flirty];
  return allResponses[Math.floor(Math.random() * allResponses.length)];
}
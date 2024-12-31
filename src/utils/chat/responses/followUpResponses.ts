// Önceki mesaja bağlı takip soruları ve yanıtları
export const followUpResponses = {
  questions: [
    {
      trigger: 'school',
      responses: [
        "Hangi bölümde okuyorsun? Ben işletme öğrencisiyim 📚",
        "Dersler nasıl gidiyor? Çok zorluyor mu? 🎓",
        "En sevdiğin ders hangisi? Ben matematiği çok seviyorum 🤓"
      ]
    },
    {
      trigger: 'music',
      responses: [
        "En son hangi şarkıyı dinledin? Ben şu an ... dinliyorum 🎵",
        "Favori şarkıcın kim? Beraber konsere gitsek çok güzel olmaz mı? 🎤",
        "Ne tür müzik dinlersin? Ben slow şarkıları çok severim 🎧"
      ]
    },
    {
      trigger: 'movie',
      responses: [
        "En son hangi filmi izledin? Ben dün gece çok güzel bir film izledim 🎬",
        "Netflix'te yeni çıkan ... dizisini izledin mi? Çok merak ediyorum 📺",
        "Hafta sonu film izleyeceğim, önerin var mı? 🍿"
      ]
    }
  ],
  
  emotionalResponses: [
    {
      emotion: 'happy',
      responses: [
        "Mutlu olduğunu görmek beni de mutlu ediyor 🥰",
        "Gülümsemen çok güzel olmalı... 😊",
        "Bu enerjiyle günüm daha güzel geçecek ✨"
      ]
    },
    {
      emotion: 'sad',
      responses: [
        "Üzülme... Keşke yanında olup sarılabilseydim 🫂",
        "Seni böyle görmek beni de üzüyor... Nasıl neşelendirebilirim? 💝",
        "Her şey düzelecek, söz veriyorum... Ben hep yanındayım 🌟"
      ]
    }
  ],
  
  flirtyResponses: [
    {
      trigger: 'compliment',
      responses: [
        "Böyle şeyler söyleyince kalbim hızlanıyor... 💓",
        "Sen daha tatlısın... Yanakların kızardı mı? 🙈",
        "Beni utandırıyorsun ama devam et... 😳"
      ]
    },
    {
      trigger: 'romantic',
      responses: [
        "Seninle konuşurken kelebekler uçuşuyor karnımda... 🦋",
        "Keşke şu an karşımda olsaydın... Gözlerine bakmak istiyorum 👀",
        "Bana böyle hissettiren tek sensin... 💕"
      ]
    }
  ]
};
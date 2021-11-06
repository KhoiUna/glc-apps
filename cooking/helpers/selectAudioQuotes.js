export default function selectAudioQuotes(fromForm, index) {
  const quotes = {
    0: [{ speech: "thanks for reserving!", lang: "en-US" }],
    1: [{ speech: "you look great today!", lang: "en-US" }],
    2: [{ speech: "you are making Rice Hall better!", lang: "en-US" }],
    3: [{ speech: "You will be forever remembered", lang: "en-US" }],
    4: [{ speech: "We will fight covid together", lang: "en-US" }],
    5: [{ speech: "Ms. Cayla is thankful for you", lang: "en-US" }],
    6: [{ speech: "Gracias", lang: "es-ES" }],
    7: [{ speech: "谢谢", lang: "zh-CN" }],
    8: [{ speech: "ありがとう", lang: "ja-JP" }],
    9: [{ speech: "धन्यवाद", lang: "hi-IN" }],
    10: [{ speech: "감사 해요", lang: "ko-KR" }],
    11: [{ speech: "Cam on", lang: "en-US" }],
  };

  const synth = window.speechSynthesis;

  const voices = synth.getVoices();
  const langVoices = voices.filter(
    (voice) => voice.lang === quotes[index][0].lang
  );

  let utterThis;
  // If the form is WebGLTransformFeedback, only speak English
  if (fromForm === "feedback") {
    utterThis = new SpeechSynthesisUtterance("Thanks for your feedback!");
    utterThis.voice = voices.filter((voice) => voice.lang === "en-US")[
      Math.floor(Math.random() * voices.length)
    ];
    utterThis.pitch = 1;
    utterThis.rate = 1;

    synth.speak(utterThis);

    return;
  }

  // Else, speak different languages
  if (quotes[index][0].lang === "en-US" || langVoices.length !== 0) {
    utterThis = new SpeechSynthesisUtterance(quotes[index][0].speech);
  }
  if (quotes[index][0].lang !== "en-US" && langVoices.length === 0) {
    utterThis = new SpeechSynthesisUtterance("Thanks for reserving!");
  }

  utterThis.voice =
    langVoices.length !== 0
      ? langVoices[Math.floor(Math.random() * langVoices.length)]
      : voices[Math.floor(Math.random() * voices.length)]; // select randomly from available voices array
  utterThis.pitch = 1;
  utterThis.rate = 1;

  synth.speak(utterThis);

  return;
}

export default function selectAudioQuotes(fromForm, index) {
  const quotes = [
    [{ speech: "thanks for reserving!", lang: "en-US" }],
    [{ speech: "you look great today!", lang: "en-US" }],
    [{ speech: "you are making Rice Hall better!", lang: "en-US" }],
    [{ speech: "You will be forever remembered", lang: "en-US" }],
    [{ speech: "Ms. Cayla is thankful for you", lang: "en-US" }],
    [{ speech: "Gracias", lang: "es-ES" }],
    [{ speech: "谢谢", lang: "zh-CN" }],
    [{ speech: "ありがとう", lang: "ja-JP" }],
    [{ speech: "धन्यवाद", lang: "hi-IN" }],
    [{ speech: "감사 해요", lang: "ko-KR" }],
    [{ speech: "Cam on", lang: "en-US" }],
  ];

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

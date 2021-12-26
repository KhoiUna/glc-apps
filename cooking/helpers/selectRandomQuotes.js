export default function selectRandomQuotes(firstName) {
  const quotes = [
    "Thanks for reserving!",
    "You look great today!",
    "You are making Rice Hall better!",
    "You will be forever remembered!",
    "Ms. Cala is thankful for you!",
    "Gracias (Spanish: thanks)!",
    "谢谢 (Chinese: thanks)!",
    "ありがとう (Japanese: thanks)!",
    "धन्यवाद  (Indian: thanks)!",
    "감사 해요 (Korean: thanks)!",
    "Cảm ơn  (Vietnamese: thanks)!",
  ];

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  return { quote, randomIndex };
}

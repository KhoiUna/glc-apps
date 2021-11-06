export default function selectRandomQuotes(firstName) {
  const quotes = {
    0: [firstName, ", thanks for reserving!"],
    1: [firstName, ", you look great today!"],
    2: [firstName, ", you are making Rice Hall better!"],
    3: ["You will be forever remembered, ", firstName, "!"],
    4: [firstName, " and I will fight COVID together!"],
    5: ["Ms. Cala is thankful for you, ", firstName, "!"],
    6: ["Gracias (Spanish: thanks), ", firstName, "!"],
    7: ["谢谢 (Chinese: thanks), ", firstName, "!"],
    8: ["ありがとう (Japanese: thanks), ", firstName, "!"],
    9: ["धन्यवाद  (Indian: thanks), ", firstName, "!"],
    10: ["감사 해요 (Korean: thanks), ", firstName, "!"],
    11: ["Cảm ơn  (Vietnamese: thanks), ", firstName, "!"],
  };

  const randomIndex = Math.floor(Math.random() * Object.keys(quotes).length);
  const quote = quotes[randomIndex];

  return { quote: quote.join(""), randomIndex };
}

const quotes = [
  "Believe in yourself and all that you are.",
  "Your only limit is your mind.",
  "Do what you can, with what you have, where you are.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Don't let what you cannot do interfere with what you can do.",
  "Difficulties in life are intended to make us better, not bitter.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "You are stronger than you think.",
  "Every day may not be good, but there is something good in every day.",
  "The best way to predict your future is to create it.",
  "Don't be pushed by your problems. Be led by your dreams.",
  "The only way to do great work is to love what you do.",
  "Small steps in the right direction can turn out to be the biggest step of your life.",
  "Believe you can and you're halfway there.",
  "Your attitude determines your direction.",
  "Opportunities don't happen. You create them.",
  "It's not whether you get knocked down, it's whether you get up.",
  "Doubt kills more dreams than failure ever will.",
  "Happiness is not something ready-made. It comes from your own actions.",
  "Failure is the opportunity to begin again more intelligently.",
  "Your dreams don’t work unless you do.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Act as if what you do makes a difference. It does.",
  "A little progress each day adds up to big results.",
  "It always seems impossible until it’s done.",
  "You don’t have to be perfect to be amazing.",
  "Do something today that your future self will thank you for.",
  "Stay positive, work hard, make it happen.",
  "Never let your fear decide your future.",
  "Great things never come from comfort zones.",
  "You are capable of amazing things.",
  "Don’t wish for it. Work for it.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Don't let yesterday take up too much of today.",
  "Push yourself because no one else is going to do it for you.",
  "Difficult roads often lead to beautiful destinations.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "Focus on being productive instead of busy.",
  "Take care of your mental health like you take care of your phone battery.",
  "You are enough just as you are.",
  "Learn from yesterday, live for today, hope for tomorrow.",
  "The key to success is to focus on goals, not obstacles.",
  "Success is stumbling from failure to failure with no loss of enthusiasm.",
  "When you feel like giving up, remember why you started.",
  "No matter how hard it gets, keep going.",
  "Turn your wounds into wisdom.",
  "Start where you are. Use what you have. Do what you can.",
  "Even the darkest night will end, and the sun will rise.",
  "You don’t have to see the whole staircase, just take the first step."
];

function newQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteElement = document.getElementById("quote");

  quoteElement.classList.remove("opacity-100");
  quoteElement.classList.add("opacity-0");

  setTimeout(() => {
    quoteElement.innerText = quotes[randomIndex];
    quoteElement.classList.remove("opacity-0");
    quoteElement.classList.add("opacity-100");
  }, 300);
}

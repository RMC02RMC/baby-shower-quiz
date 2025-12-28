const quiz = [
  {
    question: "💕 What food does she crave the MOST these days?",
    options: ["Spicy snacks 🌶️", "Sweet desserts 🍰", "Sour fruits 🍋", "Salty chips 🍟"],
    answer: 1
  },
  {
    question: "😖 Which smell or food makes her uncomfortable now?",
    options: ["Coffee ☕", "Fried food 🍗", "Perfume 🌸", "Milk 🥛"],
    answer: 0
  },
  {
    question: "💆 What helps her relax the fastest?",
    options: ["Foot massage 👣", "Watching reels 📱", "Sleeping 😴", "Talking 💬"],
    answer: 0
  },
  {
    question: "🌙 How has her sleep pattern changed?",
    options: ["Sleeps more", "Wakes at night", "Day sleeper", "Same as before"],
    answer: 1
  },
  {
    question: "💖 What makes her instantly happy?",
    options: ["Baby shopping 🛍️", "Compliments 💕", "Talking about baby 👶", "Food 🍩"],
    answer: 2
  }
];

const punishments = [
  "😆 Give mommy-to-be a foot massage!",
  "🍦 Go get her favorite dessert!",
  "📸 Take a cute couple selfie!",
  "🍼 Practice diaper changing (imaginary)!",
  "💃 Do a funny dance for everyone!"
];

let current = 0;
let score = 0;
let answered = Array(quiz.length).fill(false);

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const punishmentEl = document.getElementById("punishment");
const video = document.getElementById("videoPlayer");

totalEl.textContent = quiz.length;

function loadQuestion() {
  const q = quiz[current];
  questionEl.textContent = `Q${current + 1}. ${q.question}`;
  optionsEl.innerHTML = "";
  punishmentEl.hidden = true;
  video.hidden = true;
  video.pause();

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (answered[current]) return;
  answered[current] = true;

  if (selected === quiz[current].answer) {
    score++;
    scoreEl.textContent = score;
    playVideo("videos/correct.mp4");
  } else {
    punishmentEl.textContent =
      punishments[Math.floor(Math.random() * punishments.length)];
    punishmentEl.hidden = false;
    playVideo("videos/wrong.mp4");
  }
}

function playVideo(src) {
  video.src = src;
  video.hidden = false;
  video.play();
}

document.getElementById("nextBtn").onclick = () => {
  if (current < quiz.length - 1) {
    current++;
    loadQuestion();
  } else {
    endGame();
  }
};

document.getElementById("backBtn").onclick = () => {
  if (current > 0) {
    current--;
    loadQuestion();
  }
};

document.getElementById("resetBtn").onclick = () => {
  current = 0;
  score = 0;
  answered.fill(false);
  scoreEl.textContent = score;
  loadQuestion();
};

function endGame() {
  questionEl.textContent = `🎉 Final Score: ${score} / ${quiz.length}`;
  optionsEl.innerHTML = "";
  punishmentEl.hidden = true;

  if (score >= 3) {
    playVideo("videos/happy.mp4");
  } else {
    playVideo("videos/sad.mp4");
  }
}

loadQuestion();

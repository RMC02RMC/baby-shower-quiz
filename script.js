const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const startBtn = document.getElementById("startBtn");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const totalEl = document.getElementById("total");
const penaltyEl = document.getElementById("penalty");
const video = document.getElementById("videoPlayer");

/* ---------------- QUESTIONS ---------------- */

const quiz = [
  {
    question: "What food does she crave the MOST these days?",
    options: ["Spicy snacks 🌶️", "Sweet desserts 🍰", "Sour fruits 🍋", "Salty chips 🍟"],
    answer: 0
  },
  {
    question: "Which smell or food makes her uncomfortable now?",
    options: ["Coffee ☕", "Fried food 🍗", "Perfume 🌸", "Milk 🥛"],
    answer: 1
  },
  {
    question: "What helps her relax the fastest?",
    options: ["Foot massage 👣", "Watching reels 📱", "Sleeping 😴", "Talking 💬"],
    answer: 2
  },
  {
    question: "How has her sleep pattern changed?",
    options: ["Sleeps more", "Wakes at night", "Day sleeper", "Same as before"],
    answer: 1
  },
  {
    question: "What makes her instantly happy?",
    options: ["Baby shopping 🛍️", "Compliments 💕", "Long Drive 🚗", "Food 🍩"],
    answer: 0
  }
];

/* ---------------- PENALTIES ---------------- */

const penalties = [
  "Give mommy-to-be a foot massage 👣",
  "Get her favorite dessert 🍰",
  "Say 5 sweet compliments 💕",
  "Do a funny dance 💃",
  "Promise diaper duty 🍼"
];

/* ---------------- STATE ---------------- */

let current = 0;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let answered = Array(quiz.length).fill(false);

totalEl.textContent = quiz.length;

/* ---------------- START QUIZ WITH ENTRY VIDEO ---------------- */

startBtn.onclick = () => {
  welcomeScreen.style.display = "none";
  quizScreen.style.display = "block";

  playVideo("videos/entryvideo.mp4", () => {
    loadQuestion();
  });
};

/* ---------------- LOAD QUESTION ---------------- */

function loadQuestion() {
  const q = quiz[current];
  questionEl.textContent = `Q${current + 1}. ${q.question}`;
  optionsEl.innerHTML = "";
  penaltyEl.style.display = "none";
  hideVideo();

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i);
    optionsEl.appendChild(btn);
  });
}

/* ---------------- CHECK ANSWER ---------------- */

function checkAnswer(choice) {
  if (answered[current]) return;
  answered[current] = true;

  if (choice === quiz[current].answer) {
    score++;
    correctCount++;
    scoreEl.textContent = score;

    const correctVideoIndex = Math.min(correctCount, 5);
    playVideo(`videos/correct${correctVideoIndex}.mp4`);
  } else {
    wrongCount++;

    const wrongVideoIndex = Math.min(wrongCount, 3);
    penaltyEl.textContent =
      "Penalty – " +
      penalties[Math.floor(Math.random() * penalties.length)];
    penaltyEl.style.display = "block";

    playVideo(`videos/wrong${wrongVideoIndex}.mp4`);
  }
}

/* ---------------- VIDEO HANDLER ---------------- */

function playVideo(src, onEndCallback) {
  video.src = src;
  video.style.display = "block";
  video.play();

  video.onended = () => {
    if (onEndCallback) {
      onEndCallback();
    }
  };
}

function hideVideo() {
  video.pause();
  video.style.display = "none";
  video.onended = null;
}

/* ---------------- NAVIGATION ---------------- */

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
  correctCount = 0;
  wrongCount = 0;
  answered.fill(false);
  scoreEl.textContent = score;

  quizScreen.style.display = "none";
  welcomeScreen.style.display = "block";
};

/* ---------------- END GAME ---------------- */

function endGame() {
  questionEl.textContent = `🎉 Final Score: ${score} / ${quiz.length}`;
  optionsEl.innerHTML = "";
  penaltyEl.style.display = "none";

  if (score >= 3) {
    playVideo("videos/happy.mp4");
  } else {
    playVideo("videos/sad.mp4");
  }
}

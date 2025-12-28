const quiz = [
  {
    question: "💕 What food does she crave the MOST these days?",
    options: [
      "Spicy snacks 🌶️",
      "Sweet desserts 🍰",
      "Sour fruits 🍋",
      "Salty chips 🍟"
    ],
    answer: 1   // <-- change based on correct answer
  },
  {
    question: "😖 Which smell or food makes her uncomfortable now?",
    options: [
      "Coffee ☕",
      "Fried food 🍗",
      "Perfume 🌸",
      "Milk 🥛"
    ],
    answer: 0
  },
  {
    question: "💆 What helps her relax the fastest?",
    options: [
      "Foot massage 👣",
      "Watching reels / TV 📱",
      "Sleeping 😴",
      "Talking / venting 💬"
    ],
    answer: 0
  },
  {
    question: "🌙 How has her sleep pattern changed?",
    options: [
      "Sleeps more than before",
      "Wakes up often at night",
      "Sleeps only during daytime",
      "Same as before"
    ],
    answer: 1
  },
  {
    question: "💖 What makes her instantly emotional or happy?",
    options: [
      "Baby shopping 🛍️",
      "Compliments 💕",
      "Talking about the baby 👶",
      "Food surprises 🍩"
    ],
    answer: 2
  }
];


let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const video = document.getElementById("videoPlayer");
const nextBtn = document.getElementById("nextBtn");

loadQuestion();

function loadQuestion() {
  video.hidden = true;
  nextBtn.hidden = true;
  optionsEl.innerHTML = "";

  const q = quiz[currentQuestion];
  questionEl.textContent = q.question;

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.onclick = () => checkAnswer(index);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  optionsEl.innerHTML = "";

  if (selected === quiz[currentQuestion].answer) {
    score++;
    playVideo("videos/correct.mp4");
  } else {
    playVideo("videos/wrong.mp4");
  }
}

function playVideo(src) {
  video.src = src;
  video.hidden = false;
  nextBtn.hidden = false;
}

nextBtn.onclick = () => {
  currentQuestion++;
  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    endGame();
  }
};

function endGame() {
  questionEl.textContent = `🎉 Game Over! Score: ${score}/${quiz.length}`;
  optionsEl.innerHTML = "";
  nextBtn.hidden = true;

  if (score >= 4) {
    playVideo("videos/champion.mp4");
  }
}

const quiz = [
  {
    question: "When do most babies arrive?",
    options: [
      "Exactly on due date",
      "1–2 weeks before due date",
      "1–2 weeks after due date",
      "Only on weekends"
    ],
    answer: 1
  },
  {
    question: "When do pregnancy cravings hit the most?",
    options: ["Morning", "Afternoon", "Late night", "During workouts"],
    answer: 2
  },
  {
    question: "Most common reason babies cry?",
    options: ["Boredom", "Hunger", "Bad dreams", "Lonely"],
    answer: 1
  },
  {
    question: "What do babies usually do first?",
    options: ["Sit", "Walk", "Roll over", "Crawl"],
    answer: 2
  },
  {
    question: "How often do newborns wake at night?",
    options: ["Once", "Twice", "Every 2–3 hours", "Never"],
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

"use strict";

const quizData = [
   {
      question: ' Which Indian festival is known as the "Festival of Lights" ?',
      a: "Holi",
      b: "Diwali",
      c: "Navratri",
      d: "Pongal",
      correct: "b"
     },
    
     {
      question: "Who composed the Indian National Anthem?",
      a: "Bankim Chandra Chatterjee",
      b: "Rabindranath Tagore",
      c: "Subramania Bharati",
      d: "Sarojini Naidu",
      correct: "b"
     },
     {
      question: 'Which state in India is famous for the classical dance form of "Kathakali" ?',
      a: "Tamil Nadu",
      b: "Kerala",
      c: "Karnatka",
      d: "Andhra Pradesh",
      correct: "b"
     },
     {
      question: "The Ajanta and Ellora caves are located in which state of India?",
      a: "Maharashtra",
      b: "Madhya Pradesh",
      c: "Rajastha",
      d: "Karnatka",
      correct: "a"
     },
     {
      question: "Which ancient language is considered the root of many Indian languages?",
      a: "Hindi",
      b: "Sanskrit",
      c: "Tamil",
      d: "Pali",
      correct: "b"
     },
     {
        question: "The famous dance form Bharatanatyam originated in which Indian state?",
        a: "Odisha",
        b: "Tamil Nadu",
        c: "Andhra Pradesh",
        d: "Karnatka",
        correct: "b"
     },
     {
        question: ' Which Indian city is known as the "City of Palaces" ?',
        a: "Udaipur",
        b: "Jaipur",
        c: "Mysore",
        d: "Hyderabad",
        correct: "c"
     },
     {
        question: "Who built the famous Sun Temple at Konark?",
        a: "Ashoka",
        b: "Harsha",
        c: "Narasimhadeva I",
        d: "Rajaraja Chola",
        correct: "c"
     },
     {
        question: "The classical music tradition in North India is known as what?",
        a: "Carnatic",
        b: "Hindustani",
        c: "Gharana",
        d: "Sufi",
        correct: "b"
     },
     {
        question: "Which festival marks the Sikh New Year and is also known for its harvest celebrations?",
        a: "Baisakhi",
        b: "Lohri",
        c: " Guru Nanak Jayanti",
        d: "Holla Mohalla",
        correct: "a"
     }
];

const quiz = document.querySelector(".quiz-body");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const footerEl = document.querySelector(".quiz-footer");
const liEls = document.querySelectorAll("ul li");

const a_txt = document.getElementById("a_text");
const b_txt = document.getElementById("b_text");
const c_txt = document.getElementById("c_text");
const d_txt = document.getElementById("d_text");

const btnSubmit = document.getElementById("submitBtn");
const btnPrev = document.getElementById("prevBtn");
const btnNext = document.getElementById("nextBtn");

let currentQuiz = 0;
let score = 0;
let selectedAnswers = new Array(quizData.length).fill(null);

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];
  questionEl.innerText = currentQuizData.question;
  a_txt.innerText = currentQuizData.a;
  b_txt.innerText = currentQuizData.b;
  c_txt.innerText = currentQuizData.c;
  d_txt.innerText = currentQuizData.d;

  // Display the previously selected answer (if any)
  if (selectedAnswers[currentQuiz]) {
    document.getElementById(selectedAnswers[currentQuiz]).checked = true;
  }

  // Handle visibility of the previous and next/submit buttons
  btnPrev.style.visibility = currentQuiz === 0 ? "hidden" : "visible";
  btnNext.style.display = currentQuiz === quizData.length - 1 ? "none" : "inline-block";
  btnSubmit.style.display = currentQuiz === quizData.length - 1 ? "inline-block" : "none";
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => {
    answerEl.checked = false;
  });
}

function getSelected() {
  let selectedAnswer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      selectedAnswer = answerEl.id;
    }
  });
  return selectedAnswer;
}

// Select answer by clicking on the entire list item
liEls.forEach((liEl) => {
  liEl.addEventListener("click", () => {
    const radioBtn = liEl.querySelector("input[type='radio']");
    radioBtn.checked = true;

    // Store the selected answer in the array
    selectedAnswers[currentQuiz] = radioBtn.id;
  });
});

btnNext.addEventListener("click", function () {
  nextQuestion();
});

btnPrev.addEventListener("click", function () {
  prevQuestion();
});

btnSubmit.addEventListener("click", function () {
  const selectedAnswer = getSelected();

  if (selectedAnswer) {
    if (selectedAnswer === quizData[currentQuiz].correct) {
      score++;
    }
    showResults();
  }
});

function nextQuestion() {
  const selectedAnswer = getSelected();

  if (selectedAnswer) {
    selectedAnswers[currentQuiz] = selectedAnswer;

    if (selectedAnswer === quizData[currentQuiz].correct) {
      score++;
    }
  }

  currentQuiz++;

  if (currentQuiz < quizData.length) {
    loadQuiz();
  }
}

function prevQuestion() {
  if (currentQuiz > 0) {
    currentQuiz--;
    loadQuiz();
  }
}


function showResults() {
   quiz.innerHTML = `
     <h2>You answered ${score}/${quizData.length} questions correctly</h2>
     <button type="button" class="reload-btn" onclick="location.reload()">Reload</button>`;
   footerEl.style.display = "none";
 }
 

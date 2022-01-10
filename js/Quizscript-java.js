let questions = [
    {
        "question": "Welchen Namen hatte Java ursprünglich?",
        "answer_1": "Oak",
        "answer_2": "Spruce",
        "answer_3": "Latte",
        "answer_4": "Chai",
        "right_answer": 1,
    },

    {
        "question": "Wie viele Java-Plattformen gibt es?",
        "answer_1": "Eine",
        "answer_2": "Drei",
        "answer_3": "Vier",
        "answer_4": "Sieben",
        "right_answer": 3,
    },

    {
        "question": "Wie viele Objekte werden im folgenden Code erstellt? String s = new String('Hello')",
        "answer_1": "1",
        "answer_2": "2",
        "answer_3": "0",
        "answer_4": "4",
        "right_answer": 2,
    },

    {
        "question": "Wie  werden Java Parameter übergeben?",
        "answer_1": "break",
        "answer_2": "==",
        "answer_3": "!<=",
        "answer_4": "methodenName(Typ variableName)",
        "right_answer": 4,
    },

    {
        "question": "Nennen Sie mir einen Elementar Typen",
        "answer_1": "bollean",
        "answer_2": "body",
        "answer_3": "title",
        "answer_4": "b",
        "right_answer": 1,
    }
]

let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('Audio/SFX-Magic.mp3');
let AUDIO_WRONG = new Audio('Audio/wrong.mp3');

function showQuestion() {

    if (currentQuestion >= questions.length) {
        let percent = currentQuestion / questions.length;
        percent = percent * 100;
        document.getElementById('progressbar').style = `width: ${percent}%`;
        saveResult();
        setTimeout('finishPage()', 50);
        
    } else {
        let percent = currentQuestion / questions.length;
        percent = percent * 100;
        document.getElementById('progressbar').innerHTML = `${percent} %`;
        document.getElementById('progressbar').style = `width: ${percent}%`;
        
        let question = questions[currentQuestion];

        document.getElementById('question_text').innerHTML = question['question'];
        document.getElementById('answer1').innerHTML = question['answer_1'];
        document.getElementById('answer2').innerHTML = question['answer_2'];
        document.getElementById('answer3').innerHTML = question['answer_3'];
        document.getElementById('answer4').innerHTML = question['answer_4'];
    }
}

function answer(selection) {
    let question = questions[currentQuestion]; //die Variablen von der vorherigen Funktion. 
    console.log('Selected answer is ', selection)  // Gibt die die gewählte Antwort aus.
    let selectedQuestionnumber = selection.slice(-1); // neue Variable gleich = das letzte Zeichen der gewählten Antwort.
    console.log('selectedQuestionNumber is', selectedQuestionnumber) // Ausgabe der gewählten Antwort.
    console.log('Current answer is ', question['right_answer']) // Ausgabe der richtigen Antwort.

    let idOfRightAnswer = `answer${question['right_answer']}`;

    if (selectedQuestionnumber == question['right_answer']) {
        console.log('Richtige Antwort !');
        document.getElementById(selection).parentNode.classList.add('green');
        AUDIO_SUCCESS.play();
        answerBlock();
        rightQuestions++;
        setTimeout('nextQuestion()', 2000);
    }
    else {
        console.log('Falsche Antwort!');
        document.getElementById(selection).parentNode.classList.add('red');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('green');
        answerBlock();
        AUDIO_WRONG.play();
        setTimeout('nextQuestion()', 2000);
    }
}

function nextQuestion() {
    currentQuestion++;
    showQuestion();
    resetButtons();
}

function resetButtons() {
    document.getElementById('answer1').parentNode.classList.remove('red');
    document.getElementById('answer1').parentNode.classList.remove('green');

    document.getElementById('answer2').parentNode.classList.remove('red');
    document.getElementById('answer2').parentNode.classList.remove('green');

    document.getElementById('answer3').parentNode.classList.remove('red');
    document.getElementById('answer3').parentNode.classList.remove('green');

    document.getElementById('answer4').parentNode.classList.remove('red');
    document.getElementById('answer4').parentNode.classList.remove('green');

}

function finishPage() {
    window.location.href = "QuizAppFinish-Java.html";

}

function saveResult() {
    let result = JSON.stringify(rightQuestions);
    localStorage.setItem('rightQuestions', result);
}

function loadResult() {
    let result = localStorage.getItem('rightQuestions');
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = result;
}

function answerBlock() {
    var addClass = document.getElementById('containerOfAnswers');
    addClass.className +="answerBlock";
    setTimeout(removeAnswerBlock, 2000);
}

function removeAnswerBlock() {
    var addClass = document.getElementById('containerOfAnswers');
    addClass.classList.remove('answerBlock');
}
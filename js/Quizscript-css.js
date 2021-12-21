let questions = [
    {
        "question": "Die Eigenschaft display hat seit CSS 3 neue Werte. Welcher ist hinzugekommen?",
        "answer_1": "table-cell",
        "answer_2": "grid-row",
        "answer_3": "columns",
        "answer_4": "inline-flex",
        "right_answer": 4,
    },

    {
        "question": "Welcher folgender Selektoren ist ungültig? ",
        "answer_1": "p[class^=wahr]",
        "answer_2": "ul:nth-child(2n+O)",
        "answer_3": "a ~ strong",
        "answer_4": "p < strong",
        "right_answer": 4,
    },

    {
        "question": "Was ist nicht das gleiche wie margin: 10px?",
        "answer_1": "margin : 10px 10 px 10px 10px",
        "answer_2": "margin: 10",
        "answer_3": "margin: 10px 10px 10px",
        "answer_4": "margin: 10px 10px",
        "right_answer": 2,
    },

    {
        "question": "Mit welchem Wert für position funktioniert top nicht?",
        "answer_1": "absolute",
        "answer_2": "relative",
        "answer_3": "static",
        "answer_4": "fixed",
        "right_answer": 3,
    },

    {
        "question": "Welche Eigenschaft gibt es bereits seit CSS 2.1?",
        "answer_1": "text-shadow",
        "answer_2": "opacity",
        "answer_3": "quotes",
        "answer_4": "background-clip",
        "right_answer": 3,
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
        setTimeout('finishPage()', 2000);
        
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
        rightQuestions++;
        setTimeout('nextQuestion()', 1000);
    }
    else {
        console.log('Falsche Antwort!');
        document.getElementById(selection).parentNode.classList.add('red');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('green');
        AUDIO_WRONG.play();
        setTimeout('nextQuestion()', 1000);
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
    window.location.href = "QuizAppFinish-CSS.html";

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


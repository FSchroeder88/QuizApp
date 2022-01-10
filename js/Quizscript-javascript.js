let questions = [
    {
        "question": "Wie heißt der Erfinder von JavaScript?",
        "answer_1": "Douglas Crockford",
        "answer_2": "Donald Trump",
        "answer_3": "Brendan Eich",
        "answer_4": "John Resig",
        "right_answer": 3,
    },

    {
        "question": "Welche der folgenden Sprachen hat keinen Einfluss auf JS?",
        "answer_1": "Self",
        "answer_2": "Java",
        "answer_3": "Prolog",
        "answer_4": "Perl",
        "right_answer": 3,
    },

    {
        "question": "Was ist true?",
        "answer_1": "0 == undefined",
        "answer_2": "0 == null",
        "answer_3": "0 >= undefined",
        "answer_4": "0 >= null",
        "right_answer": 4,
    },

    {
        "question": "Welcher der folgenden Werte ist nicht falsy?",
        "answer_1": "{}",
        "answer_2": "null",
        "answer_3": "NaN",
        "answer_4": "-0",
        "right_answer": 1,
    },

    {
        "question": "Welche der folgenden Zuweisungen ist syntaktisch nicht korrekt?",
        "answer_1": "var a = _$",
        "answer_2": "var a = &_0",
        "answer_3": "var a = π",
        "answer_4": "var a = !!0",
        "right_answer": 2,
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
        answerBlock();
        AUDIO_SUCCESS.play();
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
    window.location.href = "QuizAppFinish-JS.html";

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
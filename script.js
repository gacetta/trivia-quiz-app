console.log("script connected")

document.getElementById("getQuestionBtn").addEventListener('click', getNewQuestion)

async function getNewQuestion() {
    const API_URL = 'https://the-trivia-api.com/v2/questions';
    const categoryNumber = Math.floor(Math.random() * 10);
    console.log("getNewQuestion")
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const questionData = data[categoryNumber]

        // assign category
        const categoryElement = document.getElementById("category");
        categoryElement.textContent = questionData.category

        // assign difficulty
        const difficultyElement = document.getElementById("difficulty");
        difficultyElement.textContent = questionData.difficulty

        // assign question
        const questionElement = document.getElementById("question");
        questionElement.textContent = questionData.question.text

        // generate answer buttons
        const answers = Array(questionData.correctAnswer, ...questionData.incorrectAnswers)
        console.log(answers)
        generateButtons(answers, questionData.correctAnswer);

    } catch (err) {
        console.log("Unable to fetch from API: ", err)
    }
}

const generateButtons = (answers, correctAnswer) => {
    // locate container
    const answerButtonContainer = document.getElementById("answerBtnContainer");
    // erase previous buttons
    answerButtonContainer.innerHTML = ""

    // create unordered list for buttons
    const btnList = document.createElement('ul')
    answerButtonContainer.appendChild(btnList)

    // iterate over answers and generate buttons)
    shuffleArray(answers).forEach(answer => {
        const listElement = document.createElement("li")
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => handleAnswerClick(answer, correctAnswer))
        listElement.appendChild(button)
        btnList.appendChild(listElement)
    });
}

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const handleAnswerClick = (selectedAnswer, correctAnswer) => {
    if (selectedAnswer === correctAnswer) {
        alert("Correct!")
    } else {
        alert("Incorrect")
    }
}
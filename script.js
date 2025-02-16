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
        generateButtons(answers);

        const answerContainer = document.getElementById("answerContainer");
    } catch (err) {
        console.log("Unable to fetch from API: ", err)
    }
}

const generateButtons = (answers) => {
    // locate container
    const answerButtonContainer = document.getElementById("answerBtnContainer");
    // erase previous buttons
    answerButtonContainer.innerHTML = ""

    // iterate over answers and generate buttons
    answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => console.log(`you clicked ${answer}`))
        answerButtonContainer.appendChild(button)
    });
}
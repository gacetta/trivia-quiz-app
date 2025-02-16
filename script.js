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

        // console.log(questionData)
        console.log(questionData.category)
        console.log(questionData.difficulty)
        console.log(questionData.question.text)
        console.log(questionData.correctAnswer)
        console.log(questionData.incorrectAnswers)


        const answerContainer = document.getElementById("answerContainer");
    } catch (err) {
        console.log("Unable to fetch from API: ", err)
    }
}
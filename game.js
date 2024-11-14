//fetch question from the Banana API
async function fetchQuestion() {
    try {
      const response = await fetch("/banana-api"); // Use the proxy path
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Question URL:", data.question);
      console.log("Solution:", data.solution);
  
      // Now, you can use data.question (image URL) and data.solution in your game logic
      // For example, you could display the question image
      document.getElementById("question-image").src = data.question;
      return data.solution;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }
  
  let solution = ""; // Global variable to store the correct answer
let score = 0; // Initialize score

// Function to start the game and fetch a new question
async function startGame() {
  solution = await fetchQuestion(); // Fetch new question and set solution
  document.getElementById("feedback").innerText = ""; // Clear feedback
  document.getElementById("answer-input").value = ""; // Clear input
}

// Display question image in the UI
function displayQuestion(data) {
  const imageUrl = data.question; // Image URL from JSON data
  document.getElementById("question-image").src = imageUrl;
}

document.getElementById("submit").addEventListener("click", submitAnswer);
document.getElementById("new-game").addEventListener("click", startGame);

// Submit answer function to check user input against the solution
function submitAnswer() {
  const userAnswer = parseInt(
    document.getElementById("answer-input").value.trim()
  );

  console.log(typeof userAnswer, typeof solution);

  if (userAnswer === solution) {
    score++; // Increase score for correct answer
    document.getElementById("feedback").innerText = "Correct! 🎉";
    document.getElementById("feedback").style.color = "yellowgreen";
    startGame()
  } else {
    document.getElementById("feedback").innerText = "Incorrect. Try again!";
    document.getElementById("feedback").style.color = "#ff0000";
  }

  // Update the score display
  document.getElementById("score").innerText = score;
}

// Start the game when the page loads
window.onload = startGame;

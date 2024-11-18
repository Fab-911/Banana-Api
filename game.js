import Web3 from "web3";

let web3;
let currentWalletAddress = null;

// Initialize web3 without connecting
if (window.ethereum) {
  web3 = new Web3(window.ethereum);
} else {
  console.error("MetaMask is not installed!");
}

// Modified connect wallet function
async function connectWallet() {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    currentWalletAddress = accounts[0];
    
    // Load previous score from localStorage
    const savedScore = localStorage.getItem(`score_${currentWalletAddress}`);
    if (savedScore) {
      score = parseInt(savedScore);
      document.getElementById("score").innerText = score;
    }
    const truncatedAddress = `${currentWalletAddress.slice(0,6)}....${currentWalletAddress.slice(-5)}`;
    document.getElementById("wallet-address").innerText = `Connected Wallet: ${truncatedAddress}`;
    document.getElementById("connect-wallet").style.display = "none";
    document.getElementById("disconnect-wallet").style.display = "block";
    
    return true;
  } catch (error) {
    console.error("Connection error:", error);
    alert("Failed to connect wallet");
    return false;
  }
}

// New disconnect wallet function
function disconnectWallet() {
  currentWalletAddress = null;
  document.getElementById("wallet-address").innerText = "";
  document.getElementById("connect-wallet").style.display = "block";
  document.getElementById("disconnect-wallet").style.display = "none";
  score = 0;
  document.getElementById("score").innerText = score;
}

// Submit answer function to check user input against the solution
function submitAnswer() {
  const userAnswer = parseInt(document.getElementById("answer-input").value.trim());
  
  if (userAnswer === solution) {
    score++; // Increase score for correct answer
    
    if (!currentWalletAddress) {
      alert("Connect your wallet to save your score!");
    } else {
      // Save score to localStorage
      localStorage.setItem(`score_${currentWalletAddress}`, score.toString());
    }
    
    document.getElementById("feedback").innerText = "Correct! 🎉";
    document.getElementById("feedback").style.color = "yellowgreen";
    startGame();
  } else {
    document.getElementById("feedback").innerText = "Incorrect. Try again!";
    document.getElementById("feedback").style.color = "#ff0000";
  }
  
  document.getElementById("score").innerText = score;
}

// Event listeners
document.getElementById("connect-wallet").addEventListener("click", connectWallet);
document.getElementById("disconnect-wallet").addEventListener("click", disconnectWallet);
document.getElementById("submit").addEventListener("click", submitAnswer);
document.getElementById("new-game").addEventListener("click", startGame);

// Start the game when the page loads
window.onload = startGame;

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

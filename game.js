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
  
  
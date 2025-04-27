export async function startQuizAsTeacher(quizId, token) {
    try {
      const response = await fetch("http://localhost:7000/api/quizzes/start_teach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quizId }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to start quiz.");
      }
  
      console.log("Quiz started:", data.message);
      return data;
    } catch (error) {
      console.error("Error starting quiz:", error.message);
      throw error;
    }
  }  
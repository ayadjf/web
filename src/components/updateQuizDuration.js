export async function updateQuizDuration(quizId, duration, token) {
    try {
      const response = await fetch("http://localhost:7000/api/quizzes/update_duration", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quizId, duration }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update quiz duration.");
      }
  
      console.log("Quiz duration updated:", data.message);
      return data;
    } catch (error) {
      console.error("Error updating quiz duration:", error.message);
      throw error;
    }
  }
  
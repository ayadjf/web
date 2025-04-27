import React, { useState } from 'react';
import { FaClock, FaPlus, FaTimes, FaCalendarAlt } from 'react-icons/fa';
import './Content.css';
import { useEffect } from 'react';
import axios from 'axios'; // Assuming you are using axios for API requests

export async function updateQuizTitle(id, newTitle, token) {
  try {
    const response = await fetch(`http://localhost:7000/api/quizzes/${id}/title`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title: newTitle }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update quiz title');
    }

    return result.quiz; // Updated quiz object
  } catch (error) {
    console.error('Error in updateQuizTitle:', error.message);
    throw error;
  }
}
export async function deleteQuiz(id, token) {
  try {
    const response = await fetch(`http://localhost:7000/api/quizzes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete quiz');
    }

    return result.message; // "Quiz supprimé avec succès."
  } catch (error) {
    console.error('Error in deleteQuiz:', error.message);
    throw error;
  }
}
const CreateQuiz = () => {
  const [quizId, setQuizId] = useState('12345');
  const [quizName, setQuizName] = useState('');
  const [token, setToken] = useState('yourTeacherTokenHere');
  const [message, setMessage] = useState('');
  const [module, setModule] = useState('');
  const [level, setLevel] = useState('');
  const [timingBy, setTimingBy] = useState('');
  const [quizDuration, setQuizDuration] = useState('');
  const [questionVisibility, setQuestionVisibility] = useState('');
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState("");

  const handleOptionChange = (questionId, optionIndex, newValue) => {
    const updatedQuestions = questions.map((question) => {
      if (question.id === questionId) {
        const updatedOptions = [...question.options];
        updatedOptions[optionIndex] = newValue;
        return { ...question, options: updatedOptions };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  
  
  useEffect(() => {
    // Automatically update the quiz title whenever the input changes
    if (quizName) {
      const updateQuiz = async () => {
        try {
          const updatedQuiz = await updateQuizTitle(quizId, quizName, token);
          setMessage(`Quiz title updated to: ${updatedQuiz.title}`);
          console.log('Updated quiz:', updatedQuiz);
        } catch (error) {
          setMessage('Failed to update quiz title');
          console.error('Error updating quiz title:', error);
        }
      };

      updateQuiz(); // Call the update function
    }
  }, [quizName, quizId, token]); // Triggers every time quizName changes

  
  const handleCheckboxChange = (value, currentArray, setArray) => {
    if (currentArray.includes(value)) {
      setArray(currentArray.filter(item => item !== value));
    } else {
      setArray([...currentArray, value]);
    }
  };
  
  const handleDelete = async () => {
    try {
      const result = await deleteQuiz(quizId, token);
      setMessage(result); // Success message
      console.log(result); // You can log the result here for debugging
    } catch (error) {
      setMessage('Error deleting quiz');
      console.error('Error deleting quiz:', error);
    }
  };
  // Function to start the quiz as a teacher
const startQuizAsTeacher = async (quizId, token) => {
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
  }
};
const handleSubmit = async () => {
  try {
    const data = await startQuizAsTeacher(quizId, token);
    if (data) {
      setIsQuizStarted(true);
      console.log("Quiz is now available:", data);
    }
  } catch (error) {
    console.error("Error during quiz start:", error);
  }
};

  async function updateQuizDuration(id, newDuration, token) {
    try {
      const response = await fetch(`http://localhost:7000/api/quizzes/${id}/duration`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ duration: newDuration })
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update quiz duration');
      }
  
      return result.quiz;
    } catch (error) {
      console.error('Error in updateQuizDuration:', error.message);
      throw error;
    }
  }
  
  async function updateQuizTimedBy(id, newTimedBy, token) {
    try {
      const response = await fetch(`http://localhost:7000/api/quizzes/${id}/timedby`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ timedby: newTimedBy })
      });
  
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update timed_by');
      }
  
      return result.quiz;
    } catch (error) {
      console.error('Error in updateQuizTimedBy:', error.message);
      throw error;
    }
  }
  

  
   
    useEffect(() => {
      if (timingBy) {
        updateQuizTimedBy(quizId, timingBy, token)
          .then(() => {
            console.log('Timing by updated successfully');
          })
          .catch((error) => {
            alert('Error updating timing by: ' + error.message);
          });
      }
    }, [timingBy, quizId, token]);
  
    useEffect(() => {
      if (timingBy === 'quiz' && quizDuration) {
        updateQuizDuration(quizId, quizDuration, token)
          .then(() => {
            console.log('Quiz duration updated successfully');
          })
          .catch((error) => {
            alert('Error updating quiz duration: ' + error.message);
          });
      }
    }, [quizDuration, timingBy, quizId, token]);

    const createQuestion = async () => {
      try {
        // Create a new question object
        const newQuestion = {
          text: '', // You can leave it empty for now or set a default text
          options: ['', '', '', ''], // Default empty options for the question
          grade: '', // Default grade
        };
  
        // Update the state to add the new question to the UI immediately
        setQuestions([...questions, newQuestion]);
  
        // Send the new question to the backend (make sure to adjust the endpoint)
        const response = await axios.post('/api/questions', newQuestion); // POST request to save the new question
        console.log('Question added to the backend:', response.data);
      } catch (error) {
        console.error('Error adding question:', error);
      }
    };
    const updateQuestionField = async (questionId, field, value) => {
      try {
        const updatedQuestions = questions.map((q) =>
          q.id === questionId ? { ...q, [field]: value } : q
        );
        setQuestions(updatedQuestions);
  
        const questionToUpdate = updatedQuestions.find(q => q.id === questionId);
  
        await fetch(`http://localhost:5000/api/questions/${questionId}/modify`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            questionText: questionToUpdate.text,
            durationMinutes: questionToUpdate.durationMinutes || 10,
            grade: questionToUpdate.grade
          })
        });
  
        console.log('Question modifiée avec succès');
      } catch (error) {
        console.error('Erreur lors de la modification de la question:', error);
      }
    };
  
    const removeQuestion = async (questionId) => {
      try {
        await fetch(`http://localhost:5000/api/questions/${questionId}/delete`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        setQuestions(prev => prev.filter(q => q.id !== questionId));
        console.log('Question supprimée avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de la question:', error);
      }
    };
    // Ajouter une option
  const addOption = (questionId) => {
    setQuestions(questions.map((q) => {
      if (q.id === questionId) {
        return { ...q, options: [...q.options, ''] };
      }
      return q;
    }));
  };

  // Supprimer une option
  const removeOption = (questionId, optionIndex) => {
    setQuestions(questions.map((q) => {
      if (q.id === questionId) {
        const updatedOptions = q.options.filter((_, i) => i !== optionIndex);
        return { ...q, options: updatedOptions };
      }
      return q;
    }));
  };
  // Créer une réponse
  const createAnswer = (questionId, answerText, isCorrect) => {
    fetch(`http://localhost:5000/api/answers/question/${questionId}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        answerText: answerText,
        isCorrect: isCorrect,
        questionId: questionId
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log('Réponse créée:', data.answer);
    })
    .catch(error => {
      console.error('Erreur création réponse:', error);
    });
  };

  // Modifier une réponse
  const modifyAnswer = (answerId, updatedData) => {
    fetch(`http://localhost:5000/api/answers/${answerId}/modify`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    })
    .then(res => res.json())
    .then(data => {
      console.log('Réponse modifiée:', data.answer);
    })
    .catch(error => {
      console.error('Erreur modification réponse:', error);
    });
  };

  // Supprimer une réponse
  const deleteAnswer = (answerId) => {
    fetch(`http://localhost:5000/api/answers/${answerId}/delete`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log('Réponse supprimée:', data.message);
    })
    .catch(error => {
      console.error('Erreur suppression réponse:', error);
    });
  };
  return (
    <div className="create-quiz-wrapper">
  <div className="quiz-container">
    <h2>Create Quiz</h2>

    <form className="quiz-form" onSubmit={handleSubmit}>
      {/* Quiz Form Fields */}

      <div className="top-inputs">
        <div className="form-control">
          <label>Module :</label>
          <select
            id="module"
            value={module}
            onChange={(e) => setModule(e.target.value)}
          >
            <option value="">Select Module</option>
            <option value="POO">POO</option>
            <option value="LOGM">LOGM</option>
            <option value="ANAL4">ANAL4</option>
            <option value="PRST2">PRST2</option>
          </select>
        </div>

        <div className="form-control">
          <label>Level :</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className={level ? 'selected' : 'placeholder'}
          >
            <option value="">Select level</option>
            <option value="1CP">1CP</option>
            <option value="2CP">2CP</option>
            <option value="1CS">1CS</option>
            <option value="2CS">2CS</option>
            <option value="3CS">3CS</option>
          </select>
        </div>

        <div className="form-control">
          <label>Timing By:</label>
          <select
            value={timingBy}
            onChange={(e) => setTimingBy(e.target.value)}
          >
            <option value="">Select</option>
            <option value="question">Question</option>
            <option value="quiz">Quiz</option>
          </select>
        </div>

        {timingBy === 'quiz' && (
          <div className="form-control">
            <label>Quiz Duration:</label>
            <input
              type="text"
              placeholder="hh:mm:ss"
              value={quizDuration}
              onChange={(e) => setQuizDuration(e.target.value)}
            />
          </div>
        )}

        <div className="form-control">
          <label>Question Visibility:</label>
          <select
            value={questionVisibility}
            onChange={(e) => setQuestionVisibility(e.target.value)}
          >
            <option value="">Select</option>
            <option value="show">Show</option>
            <option value="hide">Hide</option>
          </select>
        </div>
      </div>

      {level && (
        <div className="top-inputs">
          <div className="form-control">
            <label>Section(s):</label>
            <div className="checkbox-group">
              {['A', 'B', 'C', 'D'].map((section) => (
                <label key={section}>
                  <input
                    type="checkbox"
                    value={section}
                    checked={sections.includes(section)}
                    onChange={() => handleCheckboxChange(section, sections, setSections)}
                  />
                  Section {section}
                </label>
              ))}
            </div>
          </div>

          <div className="form-control">
            <label>Group(s):</label>
            <div className="checkbox-group">
              {[...Array(13)].map((_, i) => {
                const groupValue = `Group ${i + 1}`;
                return (
                  <label key={groupValue}>
                    <input
                      type="checkbox"
                      value={groupValue}
                      checked={groups.includes(groupValue)}
                      onChange={() => handleCheckboxChange(groupValue, groups, setGroups)}
                    />
                    {groupValue}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="input-group">
        <label htmlFor="students">Students (emails):</label>
        <input
          type="text"
          id="students"
          placeholder="email1@example.com, email2@example.com"
          value={students}
          onChange={(e) => setStudents(e.target.value)}
        />
      </div>

      <div className="form-control full-width">
        <label>Quiz Name:</label>
        <input
          type="text"
          placeholder="Enter quiz title"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)} // Update quizName on input change
        />
      </div>

      {message && <div>{message}</div>}

      <div className="questions-container">

        {questions.map((question, index) => (
          <div className="question-box small" key={question.id}>
            <div className="question-header">
              <h4>Question {index + 1}</h4>
              <div className="grade-box">
                <label>Grade:</label>
                <input
                  placeholder="1 point"
                  type="text"
                  value={question.grade}
                  onChange={(e) => updateQuestionField(question.id, 'grade', e.target.value)}
                />
              </div>
              {index === questions.length - 1 && (
                <div
                  className="remove-question-top"
                  onClick={() => removeQuestion(question.id)}
                >
                  <FaTimes />
                </div>
              )}
            </div>

            <input
              type="text"
              value={question.text}
              onChange={(e) => updateQuestionField(question.id, 'text', e.target.value)}
              placeholder="Enter the question"
              className="question-input"
            />

            <div className="options">
              {question.options.map((opt, i) => (
                <div className="option-row" key={i}>
                  <input type="radio" name={`q${index}`} />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => handleOptionChange(question.id, i, e.target.value)}
                    placeholder={`Option ${i + 1}`}
                  />
                  {question.options.length > 1 && (
                    <button
                      type="button"
                      className="remove-option"
                      onClick={(e) => {
                        e.preventDefault();
                        removeOption(question.id, i);
                      }}
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))}
              <div
                className="option-row add-option"
                onClick={() => addOption(question.id)}
              >
                <input type="radio" disabled />
                <span>Add option</span>
              </div>
            </div>

            {timingBy === 'question' && (
              <div className="period">
                <FaClock />
                <label>Period:</label>
                <input
                  type="text"
                  value={question.period}
                  onChange={(e) => updateQuestionField(question.id, 'period', e.target.value)}
                  placeholder="hh:mm:ss"
                />
              </div>
            )}
          </div>
        ))}

        <div className="add-question-wrapper">
          <button type="button" className="add-question-btn" onClick={createQuestion}>
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Date and Time Input */}
      <div className="bottom-row">
        <FaClock />
        <label>Time:</label>
        <input type="text" placeholder="hh:mm:ss" />
        <FaCalendarAlt />
        <label>Date:</label>
        <input type="date" />

        <button className="finish-btn" onClick={handleSubmit}>Finish</button>

        {isQuizStarted && <div>The quiz is now available to start!</div>}
        <button type="button" className="delete-btn" onClick={handleDelete}>
          Delete
        </button>

        {message && <div>{message}</div>} {/* Display success or error message */}
      </div>
    </form>
  </div>
</div>
  );
};

export default CreateQuiz;

import React, { useState } from 'react';
import { FaClock, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import './Content.css';

const importQuiz = async (quizId, file) => {
  const formData = new FormData();
  formData.append("quiz_id", quizId);
  formData.append("file", file);

  try {
    const response = await fetch('http://localhost:7000/api/quizzes/importQuiz', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Quiz imported successfully:", data);
      alert(data.message);
    } else {
      console.error("Error importing quiz:", data);
      alert(data.error || "An error occurred.");
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    alert("There was an error while importing the quiz.");
  }
};

const deleteQuiz = async (quizId) => {
  try {
    const response = await fetch(`http://localhost:7000/api/quizzes/${quizId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Quiz deleted successfully:", data);
      alert(data.message || "Quiz deleted successfully!");
    } else {
      console.error("Error deleting quiz:", data);
      alert(data.error || "An error occurred during deletion.");
    }
  } catch (error) {
    console.error("Delete request failed:", error);
    alert("There was a problem connecting to the server.");
  }
};

const CreateQuiz = () => {
  const [level, setLevel] = useState('');
  const [sections, setSections] = useState([]);
  const [groups, setGroups] = useState([]);
  const [module, setModule] = useState('');
  const [students, setStudents] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [questionVisibility, setQuestionVisibility] = useState('');
  const [quizName, setQuizName] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [quizDuration, setQuizDuration] = useState('');

  const handleCheckboxChange = (value, selected, setSelected) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quizName || !pdfFile) {
      alert("Please provide a quiz name and attach a PDF file.");
      return;
    }

    await importQuiz(quizName, pdfFile);
  };

  return (
    <div className="create-quiz-wrapper">
      <div className="quiz-container">
        <h2>Import Quiz</h2>

        <form className="quiz-form" onSubmit={handleSubmit}>
          <div className="top-inputs">
            <div className="form-control">
              <label>Module :</label>
              <select
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
              <label>Quiz Duration:</label>
              <input
                type="text"
                placeholder="hh:mm:ss"
                value={quizDuration}
                onChange={(e) => setQuizDuration(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label>Question:</label>
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
                        onChange={() =>
                          handleCheckboxChange(section, sections, setSections)
                        }
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
                          onChange={() =>
                            handleCheckboxChange(groupValue, groups, setGroups)
                          }
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
              placeholder="Short answer text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
            />
          </div>

          <div className="form-control full-width">
            <label>Attach PDF File:</label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPdfFile(file);
                  console.log('Uploaded file:', file.name);
                }
              }}
            />
          </div>

          <div className="bottom-row">
            <FaClock />
            <label>Time:</label>
            <input
              type="text"
              placeholder="hh:mm"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <FaCalendarAlt />
            <label>Date:</label>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            
            <button type="submit" className="finish-btn">
              Finish
            </button>
            <button type="delete" className="delete-btn">
              Delete
            </button>
          </div>

          

            
         
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;

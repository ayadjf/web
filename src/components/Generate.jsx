import React, { useState } from 'react';
import { FaClock, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import './Content.css';

// UTILITIES
import { updateQuizDuration } from './updateQuizDuration';
import { startQuizAsTeacher } from './startQuizAsTeacher'; // You must move that logic into its own file and export it

const CreateQuiz = () => {
  const [level, setLevel] = useState('');
  const [sections, setSections] = useState([]);
  const [groups, setGroups] = useState([]);
  const [module, setModule] = useState('');
  const [questionVisibility, setQuestionVisibility] = useState('');
  const [students, setStudents] = useState('');
  const [quizName, setQuizName] = useState('');
  const [cnvFile, setCnvFile] = useState(null);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [quizDuration, setQuizDuration] = useState('');

  const teacherToken = 'yourTeacherTokenHere'; // TODO: replace with actual token logic

  const handleCheckboxChange = (value, selected, setSelected) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('module', module);
    formData.append('level', level);
    formData.append('quizName', quizName);
    formData.append('time', time);
    formData.append('date', date);
    formData.append('students', JSON.stringify(students.split(',').map(email => email.trim())));
    formData.append('sections', JSON.stringify(sections));
    formData.append('groups', JSON.stringify(groups));
    if (cnvFile) formData.append('cnvFile', cnvFile);

    try {
      // 1. Create the quiz
      const response = await fetch('http://localhost:7000/api/quizzes', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to create quiz');
      const result = await response.json();
      const quizId = result.quiz._id;

      // 2. Update the quiz duration
      if (quizDuration) {
        await updateQuizDuration(quizId, quizDuration, teacherToken);
      }

      // 3. Start the quiz (make it available)
      await startQuizAsTeacher(quizId, teacherToken);

      alert('Quiz created and started successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating or starting quiz.');
    }
  };

  return (
    <div className="create-quiz-wrapper">
      <div className="quiz-container">
        <h2>Generate Quiz</h2>

        <form className="quiz-form" onSubmit={handleSubmit}>
          <div className="top-inputs">
            <div className="form-control">
              <label>Module :</label>
              <select value={module} onChange={(e) => setModule(e.target.value)}>
                <option value="">Select Module</option>
                <option value="POO">POO</option>
                <option value="LOGM">LOGM</option>
                <option value="ANAL4">ANAL4</option>
                <option value="PRST2">PRST2</option>
              </select>
            </div>

            <div className="form-control">
              <label>Level :</label>
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
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
          <div className="form-control full-width file-upload">
            <label>Attach CNV File:</label>
            <input
              type="file"
              accept=".cnv"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setCnvFile(file);
              }}
            />
            {cnvFile && <span className="file-name">📎 {cnvFile.name}</span>}
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

            <button type="submit" className="finish-btn">Finish</button>
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

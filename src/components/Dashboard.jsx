import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [average, setAverage] = useState(0);
  const [present, setPresent] = useState(0);
  const [total, setTotal] = useState(0);

  const quizId = 'your-quiz-id-here'; // <-- Remplace par ton vrai quizId
  const token = localStorage.getItem('token'); // On récupère le token s'il faut Authorization

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch participants
        const participantsRes = await fetch(`http://localhost:5000/api/results/quiz/${quizId}/participants`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const participantsData = await participantsRes.json();
        const participants = participantsData.participants || [];
        setStudents(participants);

        // 2. Fetch average grade
        const averageRes = await fetch(`http://localhost:5000/api/results/quizAverageGrade/${quizId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        const averageData = await averageRes.json();
        setAverage(averageData.averageGrade?.toFixed(2) || 0);

        // 3. Fetch attendance (participation count)
        const attendanceRes = await fetch(`http://localhost:7000/results/quizAttendance/${quizId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const attendanceData = await attendanceRes.json();
        setPresent(attendanceData.attendance || 0);
        setTotal(participants.length); // total = nombre total d'étudiants participants

      } catch (error) {
        console.error('Erreur lors du fetch des données:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="student-list-container">
        <div className="header-stats-wrapper">
          <div className="stats-container">
            <div className="card average-mark">
              <div className="card-title">Average Mark</div>
              <div className="card-content">
                <div className="card-value">{average}</div>
                <div className="mini-chart"></div>
              </div>
            </div>

            <div className="card attendance">
              <div className="card-title">Attendance</div>
              <div className="card-content">
                <div className="card-value">{present}/{total}</div>
                <div className="mini-chart light"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="student-list-container">
        <h2>Student Grades</h2>
        <table className="student-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Grade</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>
                  <button className="open-btn">Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;

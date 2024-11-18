import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GradesPage = () => {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedSemester, setSelectedSemester] = useState('Spring');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isSemesterDropdownOpen, setIsSemesterDropdownOpen] = useState(false);

  const years = [2024, 2023, 2022, 2021];
  const semesters = ['Spring', 'Fall'];

  const courses = [
    { id: 1, name: 'Math 101', grade: 'A', mid1Marks: 40, mid2Marks: 45, labInternal: 25, labExternal: 25, internalMarks: 30, externalMarks: 70, credits: 4 },
    { id: 2, name: 'Science 102', grade: 'B', mid1Marks: 35, mid2Marks: 40, labInternal: 20, labExternal: 20, internalMarks: 28, externalMarks: 72, credits: 3 },
    { id: 3, name: 'History 201', grade: 'C', mid1Marks: 30, mid2Marks: 37, labInternal: 22, labExternal: 20, internalMarks: 25, externalMarks: 75, credits: 3 },
    { id: 4, name: 'Art 101', grade: 'B', mid1Marks: 38, mid2Marks: 42, labInternal: 23, labExternal: 22, internalMarks: 29, externalMarks: 71, credits: 2 },
    { id: 5, name: 'Physical Education 101', grade: 'A', mid1Marks: 45, mid2Marks: 45, labInternal: 25, labExternal: 25, internalMarks: 35, externalMarks: 65, credits: 1 },
  ];

  const gradePoints = { A: 4, B: 3, C: 2, D: 1, F: 0 };
  const totalCredits = courses.reduce((acc, course) => acc + course.credits, 0);
  const totalPoints = courses.reduce((acc, course) => acc + gradePoints[course.grade] * course.credits, 0);
  const cgpa = (totalPoints / totalCredits).toFixed(2);

  const gradeData = {
    labels: courses.map(course => course.name),
    datasets: [
      {
        label: 'Grades',
        data: courses.map(course => gradePoints[course.grade] * 25),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const midMarkData = {
    labels: courses.map(course => course.name),
    datasets: [
      {
        label: 'Mid 1 Marks',
        data: courses.map(course => course.mid1Marks),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Mid 2 Marks',
        data: courses.map(course => course.mid2Marks),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const labMarkData = {
    labels: courses.map(course => course.name),
    datasets: [
      {
        label: 'Lab Internal Marks',
        data: courses.map(course => course.labInternal),
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Lab External Marks',
        data: courses.map(course => course.labExternal),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Grades for ${selectedSemester} ${selectedYear}`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Grades Overview</h1>
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative">
          <button
            className="flex items-center bg-white py-2 px-4 rounded shadow focus:outline-none"
            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            {selectedYear}
            <FontAwesomeIcon icon={isYearDropdownOpen ? faChevronUp : faChevronDown} className="ml-2" />
          </button>
          {isYearDropdownOpen && (
            <ul className="absolute bg-white border mt-1 rounded shadow-lg w-full z-10">
              {years.map((year) => (
                <li
                  key={year}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSelectedYear(year);
                    setIsYearDropdownOpen(false);
                  }}
                >
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="relative">
          <button
            className="flex items-center bg-white py-2 px-4 rounded shadow focus:outline-none"
            onClick={() => setIsSemesterDropdownOpen(!isSemesterDropdownOpen)}
          >
            {selectedSemester}
            <FontAwesomeIcon icon={isSemesterDropdownOpen ? faChevronUp : faChevronDown} className="ml-2" />
          </button>
          {isSemesterDropdownOpen && (
            <ul className="absolute bg-white border mt-1 rounded shadow-lg w-full z-10">
              {semesters.map((semester) => (
                <li
                  key={semester}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setSelectedSemester(semester);
                    setIsSemesterDropdownOpen(false);
                  }}
                >
                  {semester}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{selectedSemester} {selectedYear} - Course Details</h2>
        <table className="w-full text-left table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Grade</th>
              <th className="px-4 py-2">Mid 1 Marks</th>
              <th className="px-4 py-2">Mid 2 Marks</th>
              <th className="px-4 py-2">Lab Internal</th>
              <th className="px-4 py-2">Lab External</th>
              <th className="px-4 py-2">Internal Marks</th>
              <th className="px-4 py-2">External Marks</th>
              <th className="px-4 py-2">Total Marks</th>
              <th className="px-4 py-2">Credits</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td className="border px-4 py-2">{course.name}</td>
                <td className="border px-4 py-2">{course.grade}</td>
                <td className="border px-4 py-2">{course.mid1Marks}</td>
                <td className="border px-4 py-2">{course.mid2Marks}</td>
                <td className="border px-4 py-2">{course.labInternal}</td>
                <td className="border px-4 py-2">{course.labExternal}</td>
                <td className="border px-4 py-2">{course.internalMarks}</td>
                <td className="border px-4 py-2">{course.externalMarks}</td>
                <td className="border px-4 py-2">{course.internalMarks + course.externalMarks}</td>
                <td className="border px-4 py-2">{course.credits}</td>
              </tr>
            ))}
            <tr>
              <td className="border px-4 py-2 font-bold">Total</td>
              <td className="border px-4
py-2"></td>
<td className="border px-4 py-2"></td>
<td className="border px-4 py-2"></td>
<td className="border px-4 py-2"></td>
<td className="border px-4 py-2"></td>
<td className="border px-4 py-2"></td>
<td className="border px-4 py-2"></td>
<td className="border px-4 py-2"></td>
<td className="border px-4 py-2 font-bold">{totalCredits}</td>
</tr>
<tr>
<td className="border px-4 py-2 font-bold">CGPA</td>
<td className="border px-4 py-2 font-bold" colSpan="9">{cgpa}</td>
</tr>
</tbody>
</table>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
<div className="bg-white rounded-lg shadow-md p-6">
<Bar data={gradeData} options={options} />
</div>
<div className="bg-white rounded-lg shadow-md p-6">
<Bar data={midMarkData} options={options} />
</div>
<div className="bg-white rounded-lg shadow-md p-6">
<Bar data={labMarkData} options={options} />
</div>
</div>
</div>
);
};

export default GradesPage;

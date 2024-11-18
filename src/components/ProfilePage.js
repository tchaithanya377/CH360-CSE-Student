import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    personalDetails: {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
    },
    familyDetails: {
      fatherName: 'John Doe',
      motherName: 'Jane Smith',
      siblings: '2',
    },
    currentCourses: [
      { id: 1, name: 'Math 101', progress: 75 },
      { id: 2, name: 'Science 102', progress: 85 },
    ],
    professionalExperience: [
      {
        id: 1,
        jobTitle: 'Software Engineer',
        company: 'Tech Company',
        duration: '2020-2023',
        description: 'Developed web applications using React and Node.js.',
      },
    ],
    skills: ['JavaScript', 'React', 'Node.js'],
    projects: [
      {
        id: 1,
        title: 'Project One',
        description: 'Developed a full-stack web application.',
      },
    ],
    education: [
      {
        id: 1,
        degree: 'Bachelor of Computer Science',
        university: 'XYZ University',
        year: '2024',
      },
    ],
  });

  const [editMode, setEditMode] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [newEducation, setNewEducation] = useState({ degree: '', university: '', year: '' });

  const handleAddSkill = () => {
    setUserInfo({ ...userInfo, skills: [...userInfo.skills, newSkill] });
    setNewSkill('');
  };

  const handleAddProject = () => {
    const newProjectEntry = { ...newProject, id: userInfo.projects.length + 1 };
    setUserInfo({ ...userInfo, projects: [...userInfo.projects, newProjectEntry] });
    setNewProject({ title: '', description: '' });
  };

  const handleAddEducation = () => {
    const newEducationEntry = { ...newEducation, id: userInfo.education.length + 1 };
    setUserInfo({ ...userInfo, education: [...userInfo.education, newEducationEntry] });
    setNewEducation({ degree: '', university: '', year: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <button onClick={() => setEditMode(!editMode)} className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700">
          {editMode ? 'Save' : 'Edit'}
        </button>
      </header>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Personal Details</h2>
        {editMode ? (
          <>
            <input type="text" value={userInfo.personalDetails.name} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({ ...userInfo, personalDetails: { ...userInfo.personalDetails, name: e.target.value } })} />
            <input type="text" value={userInfo.personalDetails.email} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({ ...userInfo, personalDetails: { ...userInfo.personalDetails, email: e.target.value } })} />
            <input type="text" value={userInfo.personalDetails.phone} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({ ...userInfo, personalDetails: { ...userInfo.personalDetails, phone: e.target.value } })} />
            <input type="text" value={userInfo.personalDetails.address} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({ ...userInfo, personalDetails: { ...userInfo.personalDetails, address: e.target.value } })} />
          </>
        ) : (
          <>
            <p className="text-gray-600"><strong>Name:</strong> {userInfo.personalDetails.name}</p>
            <p className="text-gray-600"><strong>Email:</strong> {userInfo.personalDetails.email}</p>
            <p className="text-gray-600"><strong>Phone:</strong> {userInfo.personalDetails.phone}</p>
            <p className="text-gray-600"><strong>Address:</strong> {userInfo.personalDetails.address}</p>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Family Details</h2>
        {editMode ? (
          <>
            <input type="text" value={userInfo.familyDetails.fatherName} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({ ...userInfo, familyDetails: { ...userInfo.familyDetails, fatherName: e.target.value } })} />
            <input type="text" value={userInfo.familyDetails.motherName} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({ ...userInfo, familyDetails: { ...userInfo.familyDetails, motherName: e.target.value } })} />
            <input type="text" value={userInfo.familyDetails.siblings} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({ ...userInfo, familyDetails: { ...userInfo.familyDetails, siblings: e.target.value } })} />
          </>
        ) : (
          <>
            <p className="text-gray-600"><strong>Father's Name:</strong> {userInfo.familyDetails.fatherName}</p>
            <p className="text-gray-600"><strong>Mother's Name:</strong> {userInfo.familyDetails.motherName}</p>
            <p className="text-gray-600"><strong>Siblings:</strong> {userInfo.familyDetails.siblings}</p>
          </>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Current Courses</h2>
        {userInfo.currentCourses.map(course => (
          <div key={course.id} className="mb-4">
            <h3 className="text-xl font-bold">{course.name}</h3>
            <p className="text-gray-600">Progress: {course.progress}%</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Professional Experience</h2>
        {userInfo.professionalExperience.map(experience => (
          <div key={experience.id} className="mb-4">
            {editMode ? (
              <>
                <input type="text" value={experience.jobTitle} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({
                  ...userInfo,
                  professionalExperience: userInfo.professionalExperience.map(exp => exp.id === experience.id ? { ...exp, jobTitle: e.target.value } : exp)
                })} />
                <input type="text" value={experience.company} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({
                  ...userInfo,
                  professionalExperience: userInfo.professionalExperience.map(exp => exp.id === experience.id ? { ...exp, company: e.target.value } : exp)
                })} />
                <input type="text" value={experience.duration} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({
                  ...userInfo,
                  professionalExperience: userInfo.professionalExperience.map(exp => exp.id === experience.id ? { ...exp, duration: e.target.value } : exp)
                })} />
                <textarea value={experience.description} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({
                  ...userInfo,
                  professionalExperience: userInfo.professionalExperience.map(exp => exp.id === experience.id ? { ...exp, description: e.target.value } : exp)
                })}></textarea>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">{experience.jobTitle}</h3>
                  <p className="text-gray-600"><strong>Company:</strong> {experience.company}</p>
                  <p className="text-gray-600"><strong>Duration:</strong> {experience.duration}</p>
                  <p className="text-gray-600"><strong>Description:</strong> {experience.description}</p>
                </>
              )}
            </div>
          ))}
          {editMode && (
            <div className="flex flex-col space-y-2">
              <input type="text" placeholder="Job Title" className="w-full py-2 px-4 rounded bg-gray-200 mb-2" />
              <input type="text" placeholder="Company" className="w-full py-2 px-4 rounded bg-gray-200 mb-2" />
              <input type="text" placeholder="Duration" className="w-full py-2 px-4 rounded bg-gray-200 mb-2" />
              <textarea placeholder="Description" className="w-full py-2 px-4 rounded bg-gray-200 mb-2"></textarea>
              <button className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700">Add Experience</button>
            </div>
          )}
        </div>
  
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <ul className="list-disc list-inside">
            {userInfo.skills.map((skill, index) => (
              <li key={index} className="text-gray-600">{skill}</li>
            ))}
          </ul>
          {editMode && (
            <div className="flex items-center space-x-2 mt-4">
              <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" placeholder="Add new skill" />
              <button onClick={handleAddSkill} className="bg-blue-600 text-white py-2 px-4 rounded shadow-md hover:bg-blue-700">Add</button>
            </div>
          )}
        </div>
  
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          {userInfo.projects.map(project => (
            <div key={project.id} className="mb-4">
              {editMode ? (
                <>
                  <input type="text" value={project.title} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({
                    ...userInfo,
                    projects: userInfo.projects.map(proj => proj.id === project.id ? { ...proj, title: e.target.value } : proj)
                  })} />
                  <textarea value={project.description} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({
                    ...userInfo,
                    projects: userInfo.projects.map(proj => proj.id === project.id ? { ...proj, description: e.target.value } : proj)
                  })}></textarea>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </>
              )}
            </div>
          ))}
          {editMode && (
            <div className="flex flex-col space-y-2">
              <input type="text" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} placeholder="Project Title" className="w-full py-2 px-4 rounded bg-gray-200 mb-2" />
              <textarea value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} placeholder="Project Description" className="w-full py-2 px-4 rounded bg-gray-200 mb-2"></textarea>
              <button onClick={handleAddProject} className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700">Add Project</button>
            </div>
          )}
        </div>
  
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          {userInfo.education.map(edu => (
            <div key={edu.id} className="mb-4">
              {editMode ? (
                <>
                  <input type="text" value={edu.degree} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({
                    ...userInfo,
                    education: userInfo.education.map(education => education.id === edu.id ? { ...education, degree: e.target.value } : education)
                  })} />
                  <input type="text" value={edu.university} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({
                    ...userInfo,
                    education: userInfo.education.map(education => education.id === edu.id ? { ...education, university: e.target.value } : education)
                  })} />
                  <input type="text" value={edu.year} className="w-full py-2 px-4 rounded bg-gray-200 mb-2" onChange={(e) => setUserInfo({
                    ...userInfo,
                    education: userInfo.education.map(education => education.id === edu.id ? { ...education, year: e.target.value } : education)
                  })} />
                </>
              ) : (
                <>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-gray-600"><strong>University:</strong> {edu.university}</p>
                  <p className="text-gray-600"><strong>Year:</strong> {edu.year}</p>
                </>
              )}
            </div>
          ))}
          {editMode && (
            <div className="flex flex-col space-y-2">
              <input type="text" value={newEducation.degree} onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })} placeholder="Degree" className="w-full py-2 px-4 rounded bg-gray-200 mb-2" />
              <input type="text" value={newEducation.university} onChange={(e) => setNewEducation({ ...newEducation, university: e.target.value })} placeholder="University" className="w-full py-2 px-4 rounded bg-gray-200 mb-2" />
              <input type="text" value={newEducation.year} onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })} placeholder="Year" className="w-full py-2 px-4 rounded bg-gray-200 mb-2" />
              <button onClick={handleAddEducation} className="bg-green-600 text-white py-2 px-4 rounded shadow-md hover:bg-green-700">Add Education</button>
            </div>
          )}
        </div>
  
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Mentor Details</h2>
          <p className="text-gray-600"><strong>Mentor Name:</strong> Dr. John Smith</p>
          <p className="text-gray-600"><strong>Email:</strong> john.smith@xyzuniversity.com</p>
          <p className="text-gray-600"><strong>Phone:</strong> 987-654-3210</p>
        </div>
      </div>
    );
  };
  
  export default ProfilePage;
  
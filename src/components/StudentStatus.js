import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth";
import { Link } from "react-router-dom";

const StudentStatus = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [studentData, setStudentData] = useState(null);
  const [yearSection, setYearSection] = useState({ year: null, section: null });
  const [hod, setHod] = useState({ name: "N/A", status: "Pending" });
  const [loading, setLoading] = useState(false);

  const loggedInStudentId = user?.uid; // Student ID from authentication

  useEffect(() => {
    if (loggedInStudentId) {
      console.log("Logged in Student ID:", loggedInStudentId);
      fetchYearSectionAndData();
    } else {
      console.error("No logged-in Student ID found!");
    }
  }, [loggedInStudentId]);

  const fetchYearSectionAndData = async () => {
    if (!loggedInStudentId) {
      console.error("Student ID is required.");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Find the student's year and section dynamically
      let foundYear = null;
      let foundSection = null;
      const years = ["I", "II", "III", "IV"]; // List of possible years
      const sections = ["A", "B", "C","D","E","F"]; // List of possible sections

      for (const year of years) {
        for (const section of sections) {
          const studentRef = doc(db, `students/${year}/${section}/${loggedInStudentId}`);
          const studentSnap = await getDoc(studentRef);

          if (studentSnap.exists()) {
            foundYear = year;
            foundSection = section;
            setYearSection({ year: foundYear, section: foundSection });
            break;
          }
        }
        if (foundYear && foundSection) break;
      }

      if (!foundYear || !foundSection) {
        console.error("Year or Section is missing for the student.");
        setLoading(false);
        return;
      }

      // Step 2: Query the noDues data dynamically
      const noDuesDocRef = doc(db, `noDues/${foundYear}/${foundSection}/sem1`);
      const noDuesDocSnap = await getDoc(noDuesDocRef);

      if (!noDuesDocSnap.exists()) {
        console.error(`No dues document not found at path: noDues/${foundYear}/${foundSection}/sem1`);
        setLoading(false);
        return;
      }

      const noDuesData = noDuesDocSnap.data();

      // Step 3: Match the student ID within the students array
      const matchedStudent = noDuesData.students.find(
        (student) => student.id === loggedInStudentId
      );

      if (!matchedStudent) {
        console.error("No matching data found for the logged-in student.");
        setStudentData(null);
        setLoading(false);
        return;
      }

      // Step 4: Fetch additional student details
      const studentRef = doc(db, `students/${foundYear}/${foundSection}/${loggedInStudentId}`);
      const studentSnap = await getDoc(studentRef);

      const studentName = studentSnap.exists() ? studentSnap.data()?.name || "N/A" : "Unknown";
      const studentRollNo = studentSnap.exists() ? studentSnap.data()?.rollNo || "N/A" : "N/A";

      // Step 5: Fetch courses with faculty details
      const coursesWithFaculty = await Promise.all(
        matchedStudent.courses.map(async (course) => {
          const courseRef = doc(
            db,
            `courses/${foundYear}/${foundSection}/sem1/courseDetails`,
            course.id
          );
          const courseSnap = await getDoc(courseRef);
          const courseName = courseSnap.exists() ? courseSnap.data()?.courseName || "N/A" : "Unknown";

          const courseFaculty = matchedStudent.courses_faculty.find(
            (cf) => cf.courseId === course.id
          );

          let facultyName = "Unknown";
          let courseStatus = course.status || "Pending";
          if (courseFaculty) {
            const facultyRef = doc(db, "faculty", courseFaculty.facultyId);
            const facultySnap = await getDoc(facultyRef);
            facultyName = facultySnap.exists()
              ? facultySnap.data()?.name || "N/A"
              : "Unknown";
            courseStatus = courseFaculty.status || "Pending";
          }

          return {
            courseName,
            facultyName,
            status: courseStatus,
          };
        })
      );

      // Step 6: Fetch coordinators
      const coordinators = await Promise.all(
        matchedStudent.coordinators.map(async (coordinator) => {
          const coordinatorRef = doc(db, "faculty", coordinator.id);
          const coordinatorSnap = await getDoc(coordinatorRef);
          return {
            name: coordinatorSnap.exists()
              ? coordinatorSnap.data()?.name || "N/A"
              : "Unknown",
            status: coordinator.status || "Pending",
          };
        })
      );

      // Step 7: Fetch mentors
      const mentors = await Promise.all(
        matchedStudent.mentors.map(async (mentor) => {
          const mentorRef = doc(db, "faculty", mentor.id);
          const mentorSnap = await getDoc(mentorRef);
          return {
            name: mentorSnap.exists()
              ? mentorSnap.data()?.name || "N/A"
              : "Unknown",
            status: mentor.status || "Pending",
          };
        })
      );
      

// Step 8: Fetch HOD details
// Step 8: Fetch HOD details
// Step 8: Fetch HOD details
if (noDuesDocSnap.exists()) {
  const noDuesData = noDuesDocSnap.data();
  console.log("Fetched noDuesData:", noDuesData); // Log fetched data

  // Check if HOD object exists and has required fields
  const hodData = noDuesData?.hod; // Optional chaining for safe access
  console.log("HOD Data:", hodData);

  if (hodData && typeof hodData === "object") {
    // Check for valid HOD data
    setHod({
      name: hodData.name || "N/A",
      status: hodData.status || "Pending",
    });
    console.log("HOD Details Set:", hodData.name, hodData.status);
  } else {
    console.warn("HOD data is invalid or missing.");
    setHod({ name: "N/A", status: "Pending" });
  }
} else {
  console.error("No dues document not found.");
  setHod({ name: "N/A", status: "Pending" });
}

      // Step 9: Set the student data and HOD details
      setStudentData({
        name: studentName,
        rollNo: studentRollNo,
        coursesWithFaculty,
        coordinators,
        mentors,
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4">
      <Link
        to="/"
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
      >
        Logout
      </Link>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        No Dues Student Status
      </h1>
      {loading ? (
        <p className="text-center text-blue-600 font-medium">Loading...</p>
      ) : studentData ? (
        <div className="w-full max-w-4xl">
          <p className="text-lg mb-2">
            <strong>Name:</strong> {studentData.name}
          </p>
          <p className="text-lg mb-2">
            <strong>Roll Number:</strong> {studentData.rollNo}
          </p>
          <p className="text-lg mb-2">
            <strong>Year:</strong> {yearSection.year}
          </p>
          <p className="text-lg mb-6">
            <strong>Section:</strong> {yearSection.section}
          </p>

          {/* Courses Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Courses</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Course Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Faculty Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentData.coursesWithFaculty?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  studentData.coursesWithFaculty.map((course, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-all">
                      <td className="px-4 py-2 border border-gray-300">
                        {course.courseName}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {course.facultyName}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {course.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Coordinators Section */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Coordinators
            </h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Coordinator Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentData.coordinators?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  studentData.coordinators.map((coordinator, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-all">
                      <td className="px-4 py-2 border border-gray-300">
                        {coordinator.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {coordinator.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mentors Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mentors</h2>
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Mentor Name
                  </th>
                  <th className="px-4 py-2 border border-gray-300 text-left">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentData.mentors?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  studentData.mentors.map((mentor, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-all">
                      <td className="px-4 py-2 border border-gray-300">
                        {mentor.name}
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        {mentor.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="mb-6">


  <h2 className="text-xl font-bold text-gray-800 mb-4">HOD</h2>
  <table className="table-auto w-full border-collapse border border-gray-300">
    <thead>
      <tr className="bg-gray-100">
        <th className="px-4 py-2 border border-gray-300 text-left">HOD Name</th>
        <th className="px-4 py-2 border border-gray-300 text-left">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-gray-50 transition-all">
        <td className="px-4 py-2 border border-gray-300">{hod.name}</td>
        <td className="px-4 py-2 border border-gray-300">{hod.status}</td>
      </tr>
    </tbody>
  </table>
</div>


        </div>
      ) : (
        <p className="text-center text-red-600">No student data found.</p>
      )}
    </div>
  );
};

export default StudentStatus;

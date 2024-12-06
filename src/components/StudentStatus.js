import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth";
import { Link } from "react-router-dom";

const StudentStatus = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loggedInStudentId = user?.uid; // Student ID from authentication

  useEffect(() => {
    if (loggedInStudentId) {
      console.log("Logged in Student ID:", loggedInStudentId);
      fetchStudentData();
    } else {
      console.error("No logged-in Student ID found!");
    }
  }, [loggedInStudentId]);

  const fetchStudentData = async () => {
    if (!loggedInStudentId) {
      console.error("Student ID is required.");
      return;
    }

    setLoading(true);
    try {
      // Query to get the latest noDues document
      const noDuesCollectionRef = collection(db, "noDues/III/A");
      const latestNoDuesQuery = query(
        noDuesCollectionRef,
        orderBy("generatedAt", "desc"),
        limit(1)
      );
      const querySnapshot = await getDocs(latestNoDuesQuery);

      if (querySnapshot.empty) {
        console.error("No noDues documents found.");
        setStudentData(null);
        setLoading(false);
        return;
      }

      const latestNoDuesDoc = querySnapshot.docs[0];
      const noDuesData = latestNoDuesDoc.data();

      // Match the student ID within the students array
      const matchedStudent = noDuesData.students.find(
        (student) => student.id === loggedInStudentId
      );

      if (!matchedStudent) {
        console.error("No matching data found for the logged-in student.");
        setStudentData(null);
        setLoading(false);
        return;
      }

      // Fetch additional student details (e.g., rollNo and name)
      const studentRef = doc(db, "students/III/A", loggedInStudentId);
      const studentSnap = await getDoc(studentRef);

      const studentName = studentSnap.exists()
        ? studentSnap.data()?.name || "N/A"
        : "Unknown";
      const studentRollNo = studentSnap.exists()
        ? studentSnap.data()?.rollNo || "N/A"
        : "N/A";

      // Fetch courses with faculty details
      const coursesWithFaculty = await Promise.all(
        matchedStudent.courses.map(async (course) => {
          const courseRef = doc(
            db,
            "courses/Computer Science & Engineering (Data Science)/years/III/sections/A/courseDetails",
            course.id
          );
          const courseSnap = await getDoc(courseRef);

          const courseName = courseSnap.exists()
            ? courseSnap.data()?.courseName || "N/A"
            : "Unknown";

          const facultyId = matchedStudent.courses_faculty.find(
            (cf) => cf.courseId === course.id
          )?.facultyId;

          let facultyName = "Unknown";
          if (facultyId) {
            const facultyRef = doc(db, "faculty", facultyId);
            const facultySnap = await getDoc(facultyRef);
            facultyName = facultySnap.exists()
              ? facultySnap.data()?.name || "N/A"
              : "Unknown";
          }

          return {
            courseName,
            facultyName,
            status: course.status || "Pending",
          };
        })
      );

      // Fetch coordinators
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

      // Fetch mentors
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
      <><Link
         to='/'
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
        >
          Logout
        </Link></>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Student Status
      </h1>
      {loading ? (
        <p className="text-center text-blue-600 font-medium">Loading...</p>
      ) : studentData ? (
        <div className="w-full max-w-4xl">
          <p className="text-lg mb-2">
            <strong>Name:</strong> {studentData.name}
          </p>
          <p className="text-lg mb-6">
            <strong>Roll Number:</strong> {studentData.rollNo}
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
        </div>
      ) : (
        <p className="text-center text-red-600">No student data found.</p>
      )}
    </div>
  );
};

export default StudentStatus;
    
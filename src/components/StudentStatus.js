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
import { motion } from "framer-motion";

const StudentStatus = () => {
  const { user } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [yearSection, setYearSection] = useState({ year: null, section: null });
  const [loading, setLoading] = useState(false);

  const loggedInStudentId = user?.uid;

  useEffect(() => {
    if (loggedInStudentId) {
      fetchYearSectionAndData();
    }
  }, [loggedInStudentId]);

  const fetchYearSectionAndData = async () => {
    if (!loggedInStudentId) {
      console.error("Student ID is required.");
      return;
    }

    setLoading(true);
    try {
      let foundYear = null;
      let foundSection = null;
      const years = ["I", "II", "III", "IV"];
      const sections = ["A", "B", "C"];

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
        setLoading(false);
        return;
      }

      const noDuesDocRef = doc(db, `noDues/${foundYear}/${foundSection}/summary`);
      const noDuesDocSnap = await getDoc(noDuesDocRef);

      if (!noDuesDocSnap.exists()) {
        setLoading(false);
        return;
      }

      const noDuesData = noDuesDocSnap.data();

      const matchedStudent = noDuesData.students.find(
        (student) => student.id === loggedInStudentId
      );

      if (!matchedStudent) {
        setLoading(false);
        return;
      }

      const studentRef = doc(db, `students/${foundYear}/${foundSection}/${loggedInStudentId}`);
      const studentSnap = await getDoc(studentRef);

      const studentName = studentSnap.exists() ? studentSnap.data()?.name || "N/A" : "Unknown";
      const studentRollNo = studentSnap.exists() ? studentSnap.data()?.rollNo || "N/A" : "N/A";

      const coursesWithFaculty = await Promise.all(
        matchedStudent.courses.map(async (course) => {
          const courseRef = doc(
            db,
            `courses/Computer Science & Engineering (Data Science)/years/${foundYear}/sections/${foundSection}/courseDetails`,
            course.id
          );
          const courseSnap = await getDoc(courseRef);

          const courseName = courseSnap.exists()
            ? courseSnap.data()?.courseName || "N/A"
            : "Unknown";

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
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-500";
      case "pending":
        return "text-yellow-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-wide">
            <span className="text-blue-400">CampusHub360</span>
          </h1>
          <p className="text-lg text-gray-300 mt-2">Your No Dues Status Dashboard</p>
        </header>

        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105 mb-8 inline-block"
        >
          Logout
        </Link>

        {loading ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-blue-400 font-medium"
          >
            Loading...
          </motion.p>
        ) : studentData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="p-6 bg-gray-800 bg-opacity-70 rounded-lg shadow-md">
              <p className="text-lg">
                <strong>Name:</strong> {studentData.name}
              </p>
              <p className="text-lg">
                <strong>Roll Number:</strong> {studentData.rollNo}
              </p>
              <p className="text-lg">
                <strong>Year:</strong> {yearSection.year}
              </p>
              <p className="text-lg">
                <strong>Section:</strong> {yearSection.section}
              </p>
            </div>

            {/* Courses Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center">Courses</h2>
              {studentData.coursesWithFaculty.map((course, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-gray-800 rounded-lg shadow-md"
                >
                  <p>
                    <strong>Course:</strong> {course.courseName}
                  </p>
                  <p>
                    <strong>Faculty:</strong> {course.facultyName}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={getStatusColor(course.status)}>
                      {course.status}
                    </span>
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Coordinators Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center">Coordinators</h2>
              {studentData.coordinators.map((coordinator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-gray-800 rounded-lg shadow-md"
                >
                  <p>
                    <strong>Name:</strong> {coordinator.name}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={getStatusColor(coordinator.status)}>
                      {coordinator.status}
                    </span>
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Mentors Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center">Mentors</h2>
              {studentData.mentors.map((mentor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 bg-gray-800 rounded-lg shadow-md"
                >
                  <p>
                    <strong>Name:</strong> {mentor.name}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span className={getStatusColor(mentor.status)}>
                      {mentor.status}
                    </span>
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-red-400"
          >
            No student data found.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default StudentStatus;

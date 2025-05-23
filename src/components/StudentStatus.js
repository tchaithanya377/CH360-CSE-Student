import React, { useState, useEffect } from "react";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../auth";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle, AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";

const getStatusIcon = (status) => {
  if (status === "Pending") {
    return <AiOutlineClockCircle className="inline mr-1 text-yellow-500" title="Pending" />;
  }
  if (status === "Approved" || status === "Cleared") {
    return <AiOutlineCheckCircle className="inline mr-1 text-green-600" title="Approved" />;
  }
  if (status === "Rejected" || status === "Not Cleared") {
    return <AiOutlineCloseCircle className="inline mr-1 text-red-500" title="Rejected" />;
  }
  return <AiOutlineInfoCircle className="inline mr-1 text-blue-400" title="Info" />;
};

const StudentStatus = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [studentData, setStudentData] = useState(null);
  const [yearSection, setYearSection] = useState({ year: null, section: null });
  const [hod, setHod] = useState({ name: "N/A", status: "Pending" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [semester, setSemester] = useState("sem2"); // Make this dynamic as needed

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
    setError(null);
    setLoading(true);

    try {
      if (!loggedInStudentId) throw new Error("Student ID is required.");

      // 1. Find year and section
      let foundYear = null, foundSection = null;
      const years = ["I", "II", "III", "IV"];
      const sections = ["A", "B", "C", "D", "E", "F"];

      for (const year of years) {
        for (const section of sections) {
          const studentRef = doc(db, `students/${year}/${section}/${loggedInStudentId}`);
          const studentSnap = await getDoc(studentRef);
          if (studentSnap.exists()) {
            foundYear = year;
            foundSection = section;
            setYearSection({ year, section });
            break;
          }
        }
        if (foundYear && foundSection) break;
      }
      if (!foundYear || !foundSection) throw new Error("Student's year or section not found.");

      // 2. Fetch noDues document for the selected semester
      const noDuesDocRef = doc(db, `noDues/${foundYear}/${foundSection}/${semester}`);
      const noDuesDocSnap = await getDoc(noDuesDocRef);
      if (!noDuesDocSnap.exists()) throw new Error(`No dues document not found for ${semester}.`);

      const noDuesData = noDuesDocSnap.data();

      // 3. Find student in noDues
      const matchedStudent = noDuesData.students?.find(s => s.id === loggedInStudentId);
      if (!matchedStudent) throw new Error("No matching student data in no dues document.");

      // 4. Fetch student details
      const studentRef = doc(db, `students/${foundYear}/${foundSection}/${loggedInStudentId}`);
      const studentSnap = await getDoc(studentRef);
      const studentName = studentSnap.exists() ? studentSnap.data()?.name || "N/A" : "Unknown";
      const studentRollNo = studentSnap.exists() ? studentSnap.data()?.rollNo || "N/A" : "N/A";

      // 5. Courses with faculty
      const coursesWithFaculty = await Promise.all(
        (matchedStudent.courses ?? []).map(async (course) => {
          const courseRef = doc(db, `courses/${foundYear}/${foundSection}/${semester}/courseDetails`, course.id);
          const courseSnap = await getDoc(courseRef);
          const courseName = courseSnap.exists() ? courseSnap.data()?.courseName || "N/A" : "Unknown";
          const courseFaculty = (matchedStudent.courses_faculty ?? []).find(cf => cf.courseId === course.id);
          let facultyName = "Unknown";
          let courseStatus = course.status || "Pending";
          if (courseFaculty) {
            const facultyRef = doc(db, "faculty", courseFaculty.facultyId);
            const facultySnap = await getDoc(facultyRef);
            facultyName = facultySnap.exists() ? facultySnap.data()?.name || "N/A" : "Unknown";
            courseStatus = courseFaculty.status || "Pending";
          }
          return { courseName, facultyName, status: courseStatus };
        })
      );

      // 6. Coordinators
      const coordinators = await Promise.all(
        (matchedStudent.coordinators ?? []).map(async (coordinator) => {
          const coordinatorRef = doc(db, "faculty", coordinator.id);
          const coordinatorSnap = await getDoc(coordinatorRef);
          return {
            name: coordinatorSnap.exists() ? coordinatorSnap.data()?.name || "N/A" : "Unknown",
            status: coordinator.status || "Pending",
          };
        })
      );

      // 7. Mentors
      const mentors = await Promise.all(
        (matchedStudent.mentors ?? []).map(async (mentor) => {
          const mentorRef = doc(db, "faculty", mentor.id);
          const mentorSnap = await getDoc(mentorRef);
          return {
            name: mentorSnap.exists() ? mentorSnap.data()?.name || "N/A" : "Unknown",
            status: mentor.status || "Pending",
          };
        })
      );

      // 8. HOD: Find faculty with designation including "Head"
      let hodInfo = { name: "N/A", designation: "N/A", status: "Pending" };
      const facultyQuery = await getDocs(collection(db, "faculty"));
      facultyQuery.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.designation && data.designation.includes("Head")) {
          hodInfo = {
            name: data.name || "N/A",
            designation: data.designation || "N/A",
            status: noDuesData?.hod?.status || "Pending", // status from noDues
          };
        }
      });
      setHod(hodInfo);

      // 9. Set student data
      setStudentData({
        name: studentName,
        rollNo: studentRollNo,
        coursesWithFaculty,
        coordinators,
        mentors,
      });
    } catch (err) {
      setError(err.message);
      setStudentData(null);
      setHod({ name: "N/A", status: "Pending" });
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">No Dues Student Status</h1>
        <Link
          to="/"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition-transform hover:scale-105 font-semibold"
        >
          Logout
        </Link>
      </div>

      {loading && (
        <div className="flex justify-center items-center w-full my-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
          <span className="ml-4 text-blue-700 font-medium">Loading...</span>
        </div>
      )}

      {error && (
        <div className="w-full max-w-2xl bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
          {error}
        </div>
      )}

      {studentData && (
        <div className="w-full max-w-4xl space-y-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <p className="text-lg font-bold text-gray-800 mb-1">{studentData.name}</p>
              <p className="text-gray-600 mb-1">Roll Number: <span className="font-medium">{studentData.rollNo}</span></p>
              <p className="text-gray-600">Year: <span className="font-medium">{yearSection.year}</span> | Section: <span className="font-medium">{yearSection.section}</span></p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-block bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                Semester: {semester.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Courses Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Courses</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-4 py-2 text-left font-semibold">Course Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Faculty Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.coursesWithFaculty?.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-center text-gray-400">No data available</td>
                    </tr>
                  ) : (
                    studentData.coursesWithFaculty.map((course, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                        <td className="px-4 py-2">{course.courseName}</td>
                        <td className="px-4 py-2">{course.facultyName}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${course.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                            {getStatusIcon(course.status)}
                            {course.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Coordinators Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Coordinators</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-4 py-2 text-left font-semibold">Coordinator Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.coordinators?.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="px-4 py-2 text-center text-gray-400">No data available</td>
                    </tr>
                  ) : (
                    studentData.coordinators.map((coordinator, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                        <td className="px-4 py-2">{coordinator.name}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${coordinator.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                            {getStatusIcon(coordinator.status)}
                            {coordinator.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mentors Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Mentors</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-4 py-2 text-left font-semibold">Mentor Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {studentData.mentors?.length === 0 ? (
                    <tr>
                      <td colSpan="2" className="px-4 py-2 text-center text-gray-400">No data available</td>
                    </tr>
                  ) : (
                    studentData.mentors.map((mentor, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                        <td className="px-4 py-2">{mentor.name}</td>
                        <td className="px-4 py-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${mentor.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                            {getStatusIcon(mentor.status)}
                            {mentor.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* HOD Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">HOD</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-4 py-2 text-left font-semibold">HOD Name</th>
                    <th className="px-4 py-2 text-left font-semibold">Designation</th>
                    <th className="px-4 py-2 text-left font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">{hod.name}</td>
                    <td className="px-4 py-2">{hod.designation}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${hod.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}>
                        {getStatusIcon(hod.status)}
                        {hod.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <footer className="w-full max-w-4xl mx-auto mt-12 text-center">
        <div className="py-4 text-gray-500 text-sm">
          Developed by{" "}
          <a
            href="https://www.futureforgex.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 font-semibold hover:underline"
          >
            FutureForgeX
          </a>
        </div>
        <div className="pb-4 text-gray-400 text-xs">
          &copy; {new Date().getFullYear()} FutureForgeX. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StudentStatus;

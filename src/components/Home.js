import { motion } from 'framer-motion';
import home1 from '../images/home1.png';    
import home2 from '../images/home2.png'; // Ensure you have this image in your project
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <>
      <div className="bg-black min-h-screen flex flex-col items-center text-white">
        <header className="w-full py-6 flex justify-between items-center px-4 md:px-10">
          <div className="text-xl md:text-2xl font-bold">CampusHub360</div>
          {/* <nav className="hidden md:flex space-x-2 md:space-x-4">
            <a href="/dashboard" className="hover:text-gray-300">Dashboard</a>
            <a href="/dashboard" className="hover:text-gray-300">Courses</a>
            <a href="/dashboard" className="hover:text-gray-300">Attendance</a>
          </nav> */}
          <a href='/login' className="border border-white py-2 px-4 rounded hover:bg-white hover:text-black text-sm md:text-base">Get Started</a>
        </header>
        <main className="flex flex-1 items-center justify-center px-4 md:px-0">
          <motion.div 
            className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full md:w-1/2">
              <div className="aspect-w-16 aspect-h-9">
                <video
                  className="rounded-lg w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                >
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Welcome to CampusHub360 - Your Complete College Management Solution
              </h1>
              <p className="mb-6 text-gray-400">
                Streamline your academic journey with all your essential tools in one place.
              </p>
              <button className="bg-purple-600 py-3 px-6 rounded-full text-lg hover:bg-purple-700">Get Started</button>
            </div>
          </motion.div>
        </main>
      </div>

      <div className="bg-black min-h-screen flex flex-col items-center text-white py-10 px-4 md:px-0">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold">Effortless Enrollment</h1>
          <p className="text-gray-400 mt-2">Sign up for courses in seconds.</p>
        </div>
        <div className="flex flex-col items-center mt-10 w-full md:w-2/3">
          <div className="w-full px-4 md:px-0">
            <div className="flex justify-center">
              <img
                src={home1}
                alt="Effortless Enrollment"
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 px-4 md:px-0 w-full md:w-2/3">
          <div className="text-center">
            <h3 className="font-bold">Course Management</h3>
            <p className="text-gray-400">Access syllabi, schedules, and materials.</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold">Attendance Tracking</h3>
            <p className="text-gray-400">Stay on top of your attendance.</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold">Real-Time Grades</h3>
            <p className="text-gray-400">View your grades in real-time.</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold">User Testimonials</h3>
            <p className="text-gray-400">Hear from our users.</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold">Join CampusHub360</h3>
            <p className="text-gray-400">Sign up to get started.</p>
          </div>
          <div className="text-center">
            <h3 className="font-bold">Support Center</h3>
            <p className="text-gray-400">Get help when you need it.</p>
          </div>
        </div>
      </div>

      <div className="bg-black flex flex-col md:flex-row items-center justify-center text-white py-10 px-4 md:px-0">
        <div className="w-full md:w-1/2 p-4 md:p-6">
          <div className="flex justify-center items-center h-full">
            <p className="text-center md:text-left text-lg md:text-2xl italic">
              "This platform has revolutionized my college experience."
              <br />
              <span className="font-bold">Jane Doe, Student</span>
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4 md:p-6">
          <img
            src={home2}
            alt="Testimonial"
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      <div className="bg-purple-800 flex flex-col items-center justify-center text-white py-10 px-4 md:px-0">
        <div className="bg-black rounded-lg p-8 w-full md:w-1/3">
          <div className="flex justify-center mb-6">
            <img
              src={home2}
              alt="Sign Up"
              className="rounded-full w-16 h-16"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <p className="text-center mb-4">Join Today!</p>
    
          <div className="mb-4">
            <label className="block text-gray-400">Full Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400">Email Address</label>
            <input
              type="email"
              className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700"
            />
          </div>
          <button className="w-full bg-purple-600 py-2 rounded-lg">Continue with Email</button>
          <p className="text-center text-gray-400 text-sm mt-4">
            By continuing you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>
          </p>
        </div>
      </div>

      <footer className="bg-black text-white py-10 px-4 md:px-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold">CampusHub360</h3>
            <p className="mt-2">Address:<br />123 Campus Rd, College Town, USA</p>
            <p className="mt-2">Contact:<br />1800 123 4567<br />support@campushub360.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#"><i className="fab fa-facebook fa-lg"></i></a>
              <a href="#"><i className="fab fa-instagram fa-lg"></i></a>
              <a href="#"><i className="fab fa-twitter fa-lg"></i></a>
              <a href="#"><i className="fab fa-linkedin fa-lg"></i></a>
              <a href="#"><i className="fab fa-youtube fa-lg"></i></a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-10">
            <div>
              <h4 className="font-bold">Links</h4>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">Resources</h4>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Courses</a></li>
                <li><a href="#" className="hover:underline">Attendance</a></li>
                <li><a href="#" className="hover:underline">Grades</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-10 flex justify-between items-center border-t border-gray-700 pt-6">
          <p>© 2024 CampusHub360. All rights reserved.</p>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default Home;

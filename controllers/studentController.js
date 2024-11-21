// const Student = require("../models/Student");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// // Register a new student
// exports.registerStudent = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newStudent = new Student({
//       name,
//       email,
//       password: hashedPassword,
//     });
//     await newStudent.save();
//     res.status(201).json({ message: "Student registered successfully!" });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // Student login
// exports.loginStudent = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const student = await Student.findOne({ email });
//     if (!student) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, {
//       expiresIn: "30d",
//     });
//     res.status(200).json({ token });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // Get all students (Admin)
// exports.getAllStudents = async (req, res) => {
//   try {
//     const students = await Student.find();
//     res.status(200).json(students);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const Student = require("../models/Student");
const Course = require("../models/Course");

// Register a new student
exports.registerStudent = async (req, res) => {
  const { name, email, uniqueID } = req.body;

  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent)
      return res.status(400).json({ message: "Student already exists." });

    const student = await Student.create({ name, email, uniqueID });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enroll a student in a course
exports.enrollInCourse = async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or Course not found." });
    }

    if (student.courses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "Student already enrolled in this course." });
    }

    student.courses.push(courseId);
    await student.save();

    res.status(200).json({ message: "Student enrolled successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get student details
exports.getStudentDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id).populate("courses");
    if (!student)
      return res.status(404).json({ message: "Student not found." });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Record attendance
exports.recordAttendance = async (req, res) => {
  const { studentId, courseId, status } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student)
      return res.status(404).json({ message: "Student not found." });

    student.attendance.push({ course: courseId, date: new Date(), status });
    await student.save();

    res.status(200).json({ message: "Attendance recorded successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Course = require("../models/Course");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

// Create a new course
exports.createCourse = async (req, res) => {
  const { name, description, baseFee, isExamOnly } = req.body;

  try {
    const course = await Course.create({
      name,
      description,
      fees: { baseFee },
      isExamOnly,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign a teacher to a course
exports.assignTeacher = async (req, res) => {
  const { courseId, teacherId } = req.body;

  try {
    const course = await Course.findById(courseId);
    const teacher = await Teacher.findById(teacherId);

    if (!course || !teacher) {
      return res.status(404).json({ message: "Course or Teacher not found." });
    }

    if (course.teachers.includes(teacherId)) {
      return res
        .status(400)
        .json({ message: "Teacher already assigned to this course." });
    }

    course.teachers.push(teacherId);
    await course.save();

    res
      .status(200)
      .json({ message: "Teacher assigned to course successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Enroll a student in a course
exports.enrollStudent = async (req, res) => {
  const { courseId, studentId } = req.body;

  try {
    const course = await Course.findById(courseId);
    const student = await Student.findById(studentId);

    if (!course || !student) {
      return res.status(404).json({ message: "Course or Student not found." });
    }

    if (course.students.includes(studentId)) {
      return res
        .status(400)
        .json({ message: "Student already enrolled in this course." });
    }

    course.students.push(studentId);
    await course.save();

    res.status(200).json({ message: "Student enrolled successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set course schedule
exports.setSchedule = async (req, res) => {
  const { courseId, schedule } = req.body; // Schedule format: [{ day, time }]

  try {
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found." });

    course.schedule = schedule;
    await course.save();

    res.status(200).json({ message: "Schedule updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("teachers")
      .populate("students");
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Teacher = require("../models/Teacher");
const Course = require("../models/Course");

// Register a new teacher
exports.registerTeacher = async (req, res) => {
  const { name, email, uniqueID } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher)
      return res.status(400).json({ message: "Teacher already exists." });

    const teacher = await Teacher.create({ name, email, uniqueID });
    res.status(201).json(teacher);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign a teacher to a course
exports.assignCourse = async (req, res) => {
  const { teacherId, courseId } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);
    const course = await Course.findById(courseId);

    if (!teacher || !course) {
      return res.status(404).json({ message: "Teacher or Course not found." });
    }

    if (teacher.courses.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "Teacher already assigned to this course." });
    }

    teacher.courses.push(courseId);
    await teacher.save();

    res
      .status(200)
      .json({ message: "Course assigned to teacher successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set teacher schedule
exports.setSchedule = async (req, res) => {
  const { teacherId, schedule } = req.body; // Schedule format: [{ courseId, day, time }]

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher)
      return res.status(404).json({ message: "Teacher not found." });

    teacher.schedule = schedule.map((item) => ({
      course: item.courseId,
      day: item.day,
      time: item.time,
    }));
    await teacher.save();

    res.status(200).json({ message: "Schedule set successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Track teacher attendance
exports.recordAttendance = async (req, res) => {
  const { teacherId, status } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher)
      return res.status(404).json({ message: "Teacher not found." });

    teacher.attendance.push({ date: new Date(), status });
    await teacher.save();

    res.status(200).json({ message: "Attendance recorded successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

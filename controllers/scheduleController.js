const Schedule = require("../models/Schedule");
const Course = require("../models/Course");
const User = require("../models/User");

// Create a new schedule
exports.createSchedule = async (req, res) => {
  const { courseId, teacherId, startTime, endTime, mode, room, notes } =
    req.body;

  try {
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found." });

    const teacher = await User.findById(teacherId);
    if (!teacher)
      return res.status(404).json({ message: "Teacher not found." });

    const schedule = new Schedule({
      course: courseId,
      teacher: teacherId,
      startTime,
      endTime,
      mode,
      room,
      notes,
    });

    await schedule.save();
    res
      .status(201)
      .json({ message: "Schedule created successfully.", schedule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all schedules for a specific course
exports.getCourseSchedule = async (req, res) => {
  const { courseId } = req.params;

  try {
    const schedules = await Schedule.find({ course: courseId }).populate(
      "teacher course"
    );

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the schedule for a specific teacher
exports.getTeacherSchedule = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const schedules = await Schedule.find({ teacher: teacherId }).populate(
      "teacher course"
    );

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all schedules (Admin view)
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find().populate("teacher course");

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Exam = require("../models/Exam");
const Student = require("../models/Student");
const Course = require("../models/Course");

// Create an exam
exports.createExam = async (req, res) => {
  const { courseId, name, date } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found." });

    const exam = await Exam.create({ course: courseId, name, date });

    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add marks and feedback for a student
exports.addResult = async (req, res) => {
  const { examId, studentId, marks, feedback } = req.body;

  try {
    const exam = await Exam.findById(examId);

    if (!exam) return res.status(404).json({ message: "Exam not found." });

    // Check if result already exists for the student
    const existingResult = exam.results.find(
      (result) => result.student.toString() === studentId
    );

    if (existingResult) {
      existingResult.marks = marks;
      existingResult.feedback = feedback;
    } else {
      exam.results.push({ student: studentId, marks, feedback });
    }

    await exam.save();
    res.status(200).json({ message: "Result added successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get results for a specific exam
exports.getResults = async (req, res) => {
  const { examId } = req.params;

  try {
    const exam = await Exam.findById(examId)
      .populate("course")
      .populate("results.student");

    if (!exam) return res.status(404).json({ message: "Exam not found." });

    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Generate marksheet for a student
exports.getMarksheet = async (req, res) => {
  const { studentId } = req.params;

  try {
    const exams = await Exam.find({ "results.student": studentId }).populate(
      "course"
    );

    const marksheet = exams.map((exam) => {
      const result = exam.results.find(
        (res) => res.student.toString() === studentId
      );
      return {
        examName: exam.name,
        courseName: exam.course.name,
        marks: result.marks,
        feedback: result.feedback,
      };
    });

    res.status(200).json(marksheet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

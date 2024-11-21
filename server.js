const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const attendanceRoutes = require("./routes/attendanceRoutes");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const examRoutes = require("./routes/examRoutes");
const feeRoutes = require("./routes/feeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const scheduleRoutes = require("./routes/scheduleRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/fee", feeRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/student", studentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/* ********************************************************** */
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Import Routes
// const studentRoutes = require("./routes/studentRoutes");

// // Use Routes
// app.use("/api/students", studentRoutes); // This line uses the route correctly

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

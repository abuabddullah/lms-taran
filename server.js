const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const studentRoutes = require("./routes/studentRoutes");
// const teacherRoutes = require("./routes/teacherRoutes");
// const courseRoutes = require("./routes/courseRoutes");
// Add other routes similarly...

app.use("/api/students", studentRoutes);
// app.use("/api/teachers", teacherRoutes);
// app.use("/api/courses", courseRoutes);
// Use other routes similarly...

const PORT = process.env.PORT || 5000;
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

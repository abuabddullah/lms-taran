# apis
### attendance
* http://localhost:5000/api/attendance/mark (**post**)
* http://localhost:5000/api/attendance/summary/:userId (**get**)
* http://localhost:5000/api/attendance/fines (**get**)
### auth
* http://localhost:5000/api/auth/login (**post**)
* http://localhost:5000/api/auth/register (**post**)
### course
* http://localhost:5000/api/course/create (**post**)
* http://localhost:5000/api/course/assign-teacher (**post**)
* http://localhost:5000/api/course/enroll-student (**post**)
* http://localhost:5000/api/course/set-schedule (**post**)
* http://localhost:5000/api/course/all (**get**)
### exam
* http://localhost:5000/api/exam/create (**post**)
* http://localhost:5000/api/exam/add-result (**post**)
* http://localhost:5000/api/exam/results/:examId (**get**)
* http://localhost:5000/api/exam/marksheet/:studentId (**get**)
### fee
* http://localhost:5000/api/fee/generate (**post**)
* http://localhost:5000/api/fee/pay (**post**)
* http://localhost:5000/api/fee/:studentId (**get**)
### leave
* http://localhost:5000/api/leave/request (**post**)
* http://localhost:5000/api/leave/update-status (**post**)
* http://localhost:5000/api/leave/status/:userId (**get**)
* http://localhost:5000/api/leave/all (**get**)
### schedule
* http://localhost:5000/api/schedule/create (**post**)
* http://localhost:5000/api/schedule/course/:courseId (**get**)
* http://localhost:5000/api/schedule/teacher/:teacherId (**get**)
* http://localhost:5000/api/schedule/all (**get**)
### student
* http://localhost:5000/api/student/register (**post**)
* http://localhost:5000/api/student/enroll (**get**)
* http://localhost:5000/api/student/:id (**get**)
* http://localhost:5000/api/student/attendance (**get**)
### teacher
* http://localhost:5000/api/teacher/register (**post**)
* http://localhost:5000/api/teacher/assign-course (**post**)
* http://localhost:5000/api/teacher/set-schedule (**post**)
* http://localhost:5000/api/teacher/attendance (**post**)
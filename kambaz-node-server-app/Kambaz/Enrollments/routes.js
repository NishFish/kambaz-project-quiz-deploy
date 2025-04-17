import * as enrollmentDao from "./dao.js";

export default function EnrollmentRoutes(app) {
    app.get("/api/courses/enrollments", (req, res) => {
        const enrollments = enrollmentDao.findAllenrollments();
        res.send(enrollments);
    });

    app.post("/api/courses/enroll/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;

        try {
            const enrollment = enrollmentDao.enrollCourse(userId, courseId);
            if (!enrollment) {
                return res.status(400).send({ error: "Enrollment failed" });
            }
            res.status(201).send(enrollment);
        } catch (error) {
            console.error("Error enrolling user:", error);
            res.status(500).send({ error: "Internal server error" });
        }
    });


    app.delete("/api/courses/unenroll/:userId/:courseId", (req, res) => {
        const { userId, courseId } = req.params;

        try {
            const success = enrollmentDao.unenrollCourse(userId, courseId);
            if (!success) {
                return res.status(400).send({ error: "Unenrollment failed" });
            }
            res.status(200).send({ message: "Unenrollment successful" });
        } catch (error) {
            console.error("Error unenrolling user:", error);
            res.status(500).send({ error: "Internal server error" });
        }
    });

}

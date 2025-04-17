import Database from "../Database/index.js";
import model from "./model.js";

export function findAllenrollments() {
    return Database.enrollments;
}
export function enrollCourse(userId, courseId) {
    const { enrollments } = Database;
    const newEnrollment = { user: userId, course: courseId };
    Database.enrollments.push(newEnrollment);
    return newEnrollment;
}

export function unenrollCourse(userId, courseId) {
    if (!Database.enrollments) return false;

    Database.enrollments = Database.enrollments.filter(
        (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
    );
    return true;
}

export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}
export function enrollUserInCourse(user, course) {
    const newEnrollment = { user, course, _id: `${user}-${course}` };
    return model.create(newEnrollment);
}
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}

import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAssignmentForCourse(courseId) {
    return model.find({ course: courseId });
}
export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    return model.create(newAssignment);

}
export function deleteAssignment(assignmentId) {
    return model.deleteOne({ _id: assignmentId });
}
export function updateAssignment(AssignmentId, AssignmentUpdates) {
    return model.updateOne({ _id: AssignmentId }, AssignmentUpdates);
}

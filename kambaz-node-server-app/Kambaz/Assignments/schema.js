import mongoose from "mongoose";
const schema = new mongoose.Schema(
    {
        _id: String,
        title: String,
        description: String,
        modules: String,
        release: String,
        due: String,
        until: String,
        points: String,
        course: { type: String, ref: "CourseModel" },
    },
    { collection: "assignments" }
);
export default schema;
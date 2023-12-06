import UserModel from "../models/userModel.js";
import AssignmentModel from "../models/assignmentModel.js";

export default class AssignmentRepo {
  async createAssignmentRecord(payload) {
    try {
      const { title, description, track, mentor } = payload;

      const newAssignmentRecord = new AssignmentModel({
        title,
        description,
        track,
        createdBy: mentor,
      });

      await newAssignmentRecord.save();
      return newAssignmentRecord;
    } catch (error) {
      throw error;
    }
  }

  async getAllAssignments() {
    try {
      const allAssignment = await AssignmentModel.find({});
      return allAssignment;
    } catch (error) {
      throw error;
    }
  }

  async menteeAssignments(track) {
    try {
      const menteeAssignmentRecord = await AssignmentModel.find({ track });
      return menteeAssignmentRecord;
    } catch (error) {
      throw error;
    }
  }
}

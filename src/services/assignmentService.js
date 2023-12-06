import {
  BadRequestExpection,
  InputValidationExpection,
  NotFoundExpection,
} from "../../utils/error.js";
import AssignmentRepo from "../repository/assignmentRepo.js";
import UserRepo from "../repository/userRepo.js";

export const assignmentRepo = new AssignmentRepo();
const userRepo = new UserRepo();

export default class AssignmentService {
  async createAssignment(payload, userId) {
    try {
      const { title, description, track } = payload;

      if (!title || typeof title !== "string") {
        throw new InputValidationExpection(
          "A valid assignment title is required"
        );
      }

      if (!description || typeof description !== "string") {
        throw new InputValidationExpection(
          "A valid assignment description is required"
        );
      }

      if (!track) {
        throw new InputValidationExpection("A valid track is required");
      }

      const mentor = await userRepo.getUserById(userId);
      if (!mentor || mentor.role !== "mentor") {
        throw new Error("Invalid mentor ID or role.");
      }

      payload.mentor = mentor;

      const newAssignmentRecord = await assignmentRepo.createAssignmentRecord(
        payload,
        userId
      );
      return newAssignmentRecord;
    } catch (error) {
      throw error;
    }
  }

  async assignments(userId) {
    try {
      const admin = await userRepo.getUserById(userId);
      if (!admin || admin.role !== "admin") {
        throw new Error("Invalid admin ID or role.");
      }
      return await assignmentRepo.getAllAssignments();
    } catch (error) {
      throw error;
    }
  }

  async menteeTrackAssignments(track, userId) {
    try {
      const mentee = await userRepo.getUserById(userId);
      if (!mentee || mentee.role !== "mentee") {
        throw new Error("Invalid admin ID or role.");
      }

      return await assignmentRepo.menteeAssignments(track);
    } catch (error) {
      throw error;
    }
  }
}

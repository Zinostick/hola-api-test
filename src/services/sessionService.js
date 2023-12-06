import {
  BadRequestExpection,
  InputValidationExpection,
  NotFoundExpection,
} from "../../utils/error.js";

import SessionRepo from "../repository/sessionRepo.js";
import UserRepo from "../repository/userRepo.js";

export const sessionRepo = new SessionRepo();
const userRepo = new UserRepo();

export default class SessionService {
  async createSession(payload, userId) {
    try {
      const { venue, time, date, track } = payload;

      if (!venue || typeof venue !== "string") {
        throw new InputValidationExpection(
          "A valid session venue type is required"
        );
      }
      if (!time || typeof time !== "string") {
        throw new InputValidationExpection(
          "A valid session time type is required"
        );
      }
      if (!date || typeof date !== "string") {
        throw new InputValidationExpection(
          "A valid session date type is required"
        );
      }
      if (!track || typeof track !== "string") {
        throw new InputValidationExpection(
          "A valid session track type is required"
        );
      }

      const admin = await userRepo.getUserById(userId);
      if (!admin || admin.role !== "admin") {
        throw new Error("Invalid admin ID or role.");
      }

      payload.admin = admin;

      const newSessionRecord = await sessionRepo.createSessinoRecord(
        payload,
        userId
      );

      return newSessionRecord;
    } catch (error) {
      throw error;
    }
  }

  async getSessions(track, userId) {
    try {
      const users = await userRepo.getUserById(userId);
      if (!users) {
        throw new Error("Invalid user");
      }

      return await sessionRepo.trackSession(track);
    } catch (error) {
      throw error;
    }
  }
}

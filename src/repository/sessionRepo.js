import SessionModel from "../models/sessionsModel.js";

export default class SessionRepo {
  async createSessinoRecord(payload) {
    try {
      const { venue, time, date, track, admin } = payload;

      const newSessionRecord = new SessionModel({
        venue,
        time,
        date,
        track,
        scheduledBy: admin,
      });

      await newSessionRecord.save();
      return newSessionRecord;
    } catch (error) {
      throw error;
    }
  }

  async trackSession(track) {
    try {
      const mentorSession = await SessionModel.find({ track });
      return mentorSession;
    } catch (error) {
      throw error;
    }
  }
}

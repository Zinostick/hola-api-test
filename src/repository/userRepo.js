import UserModel from "../models/userModel.js";

export default class UserRepo {
  async createUserRecord(payload) {
    try {
      const { userName, email, password, role, track } = payload;

      const newUserRecord = new UserModel({
        userName,
        email,
        password,
        role,
        track,
      });

      await newUserRecord.save();
      return newUserRecord;
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const userRecord = await UserModel.findOne({ email });
      return userRecord;
    } catch (error) {
      throw error;
    }
  }

  async getUserById(userId) {
    try {
      const singleUserRecord = await UserModel.findById({ _id: userId }).select(
        "-password"
      );
      return singleUserRecord;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    try {
      const allUsersRecord = await UserModel.find({}).select("-password");
      return allUsersRecord;
    } catch (error) {
      throw error;
    }
  }

  async myTrackMentees(track) {
    try {
      const trackMenteesList = await UserModel.find({ track, role: "mentee" });
      return trackMenteesList;
    } catch (error) {
      throw error;
    }
  }
}

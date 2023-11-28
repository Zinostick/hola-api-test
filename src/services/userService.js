import {
  BadRequestExpection,
  InputValidationExpection,
  NotFoundExpection,
} from "../../utils/error.js";
import UserRepo from "../repository/userRepo.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const userRepo = new UserRepo();
export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/;

export default class UserService {
  async createUser(payload) {
    try {
      const { userName, email, password, confirmPassword, role, track } =
        payload;

      if (!userName || typeof userName !== "string") {
        throw new InputValidationExpection("username is required");
      }

      if (!email || typeof email !== "string" || !emailRegex.test(email)) {
        throw new InputValidationExpection("A valid email address is required");
      }

      if (
        !password ||
        typeof password !== "string" ||
        !passwordRegex.test(password)
      ) {
        throw new InputValidationExpection("A valid password is required");
      }

      if (
        !confirmPassword ||
        typeof confirmPassword !== "string" ||
        confirmPassword !== password
      ) {
        throw new InputValidationExpection("A valid password is required");
      }

      if (!role || typeof role !== "string") {
        throw new InputValidationExpection("Choose a role");
      }

      // Check if user exist already
      const userRecord = await userRepo.getUserByEmail(email);

      if (userRecord) {
        throw new BadRequestExpection("User account already exist");
      }

      // Hash password
      const hashedPassword = await argon2.hash(password);

      const HydratedPayload = {
        userName,
        email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        role,
        track,
      };

      const newUser = await userRepo.createUserRecord(HydratedPayload);
      return newUser.toObject();
    } catch (error) {
      throw error;
    }
  }

  async authentication(payload) {
    try {
      const { email, password } = payload;

      if (!email || typeof email !== "string" || !emailRegex.test(email)) {
        throw new InputValidationExpection("A valid email address is required");
      }

      if (
        !password ||
        typeof password !== "string" ||
        !passwordRegex.test(password)
      ) {
        throw new InputValidationExpection("A valid password is required");
      }

      const userRecord = await userRepo.getUserByEmail(email);

      if (!userRecord) {
        throw new NotFoundExpection("User not found");
      }

      // Check password is correct
      const isCorrectPassword = await argon2.verify(
        userRecord.password,
        password
      );

      if (!isCorrectPassword) {
        throw new BadRequestExpection("Incorrect credentials");
      }

      // Hydrated payload to select custom fields to encrypt
      const HydratedUserPayload = {
        userId: userRecord._id,
        role: userRecord.role,
        userName: userRecord.userName,
        track: userRecord.track,
      };

      const accessToken = jwt.sign(
        HydratedUserPayload,
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      return accessToken;
    } catch (error) {
      throw error;
    }
  }

  async myProfile(userId) {
    try {
      return await userRepo.getUserById(userId);
    } catch (error) {
      throw error;
    }
  }

  async users() {
    try {
      return await userRepo.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  async mentees(track) {
    try {
      return await userRepo.myTrackMentees(track);
    } catch (error) {
      throw error;
    }
  }
}

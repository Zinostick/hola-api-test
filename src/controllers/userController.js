/**
 * A collection of request handlers for the user modules
 */

import handleRBAC from "../../utils/handleRBAC.js";
import UserService from "../services/userService.js";

const userService = new UserService();

async function createUserController(request, response, next) {
  try {
    const userCreationResponse = await userService.createUser(request.body);
    const { password, ...user } = userCreationResponse;
    response.status(201).json({
      user,
      message: "Account created",
    });
  } catch (error) {
    next(error);
  }
}

async function userLoginController(request, response, next) {
  try {
    const accessToken = await userService.authentication(request.body);
    response.status(200).json({
      accessToken,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
}

async function myProfileController(request, response, next) {
  try {
    const { role, userId } = request.user;
    await handleRBAC(["admin", "mentor", "mentee"], role);

    const myProfile = await userService.myProfile(userId);
    const { track, ...profile } = myProfile;
    //console.log(track);
    response.status(200).json(profile);
  } catch (error) {
    next(error);
  }
}

async function allUsersController(request, response, next) {
  try {
    const { role, userId } = request.user;
    await handleRBAC(["admin"], role);

    const users = await userService.users(userId);
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function fetchMenteesController(request, response, next) {
  try {
    const { role, track } = request.user;
    await handleRBAC(["admin", "mentor"], role);

    const mentees = await userService.mentees(track);
    response.status(200).json(mentees);
  } catch (error) {
    next(error);
  }
}

export {
  createUserController,
  userLoginController,
  myProfileController,
  allUsersController,
  fetchMenteesController,
};

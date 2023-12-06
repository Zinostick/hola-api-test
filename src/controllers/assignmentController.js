import handleRBAC from "../../utils/handleRBAC.js";
import AssignmentService from "../services/assignmentService.js";

const assignmentService = new AssignmentService();

async function createAssignmentController(request, response, next) {
  try {
    const { title, description } = request.body;
    const { track, userId } = request.user;

    const createAssignmentPayload = {
      title,
      description,
      track,
    };

    const assignmentCreationResponse = await assignmentService.createAssignment(
      createAssignmentPayload,
      userId
    );

    response.status(201).json({
      data: assignmentCreationResponse,
      message: "Assignment created",
    });
  } catch (error) {
    next(error);
  }
}

async function allAssignmentController(request, response, next) {
  try {
    const { userId } = request.user;

    const allAssigments = await assignmentService.assignments(userId);

    response.status(200).json({ data: allAssigments });
  } catch (error) {
    next(error);
  }
}

async function getMenteeTrackAssignmentController(request, response, next) {
  try {
    const { track, userId } = request.user;

    const getMenteeTrackAssignments =
      await assignmentService.menteeTrackAssignments(track, userId);
    response.status(200).json({ data: getMenteeTrackAssignments });
  } catch (error) {
    next(error);
  }
}

export {
  createAssignmentController,
  allAssignmentController,
  getMenteeTrackAssignmentController,
};

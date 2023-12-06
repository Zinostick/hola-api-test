import SessionService from "../services/sessionService.js";

const sessionService = new SessionService();

async function createSessionController(request, response, next) {
  try {
    const { venue, time, date, track } = request.body;
    const { userId } = request.user;

    const sessionPayload = {
      venue,
      time,
      date,
      track,
    };

    const sessionResponse = await sessionService.createSession(
      sessionPayload,
      userId
    );
    console.log(sessionResponse);

    response.status(201).json({
      data: sessionResponse,
      message: "session created",
    });
  } catch (error) {
    next(error);
  }
}

async function trackSessionController(request, response, next) {
  try {
    const { track, userId } = request.user;
    const getSession = await sessionService.getSessions(track, userId);
    response.status(200).json({ data: getSession });
  } catch (error) {
    next(error);
  }
}

export { createSessionController, trackSessionController };

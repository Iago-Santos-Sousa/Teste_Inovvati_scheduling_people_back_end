const router = require("express").Router();
const scheduleService = require("../services/schedule");
const HttpResponseError = require("../utils/HttpResponseError");

router.post("/create/appointments", async (req, res) => {
  try {
    const { person_name, location, scheduling_date } = req.body;

    if (!person_name || !location || !scheduling_date) {
      throw new HttpResponseError.BadRequestError("Credentials is missing!");
    }

    const responseData = await scheduleService.createSchedule(
      person_name,
      location,
      scheduling_date,
      req.user.userId
    );

    res.status(201).json(responseData);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.messageResponse || "Internal server error.",
    });
  }
});

router.get("/list/appointments", async (req, res) => {
  try {
    const responseData = await scheduleService.listAppointments();
    res.status(200).json(responseData);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.messageResponse || "Internal server error.",
    });
  }
});

router.get("/get/appointments/:scheduling_id", async (req, res) => {
  try {
    const { scheduling_id } = req.params;
    if (!scheduling_id) {
      throw new HttpResponseError.BadRequestError("Credentials is missing!");
    }
    const responseData = await scheduleService.getAppointment(scheduling_id);
    res.status(200).json(responseData);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.messageResponse || "Internal server error.",
    });
  }
});

router.patch("/update/appointments", async (req, res) => {
  try {
    const { person_name, location, scheduling_date, scheduling_id } = req.body;
    if (!person_name || !location || !scheduling_date || !scheduling_id) {
      throw new HttpResponseError.BadRequestError("Credentials is missing!");
    }

    const responseData = await scheduleService.updateSchedule(
      scheduling_id,
      person_name,
      location,
      scheduling_date,
      req.user.userId
    );

    res.status(200).json(responseData);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.messageResponse || "Internal server error.",
    });
  }
});

router.delete("/delete/appointments/:scheduling_id", async (req, res) => {
  try {
    const { scheduling_id } = req.params;
    if (!scheduling_id) {
      throw new HttpResponseError.BadRequestError("Credentials is missing!");
    }
    const responseData = await scheduleService.deleteAppointment(scheduling_id);
    if (!responseData) {
      throw new HttpResponseError.NotAcceptableError(
        "Unable to delete schedule!"
      );
    }
    res.status(200).json({ status: "success", message: "deleted schedule." });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.messageResponse || "Internal server error.",
    });
  }
});

module.exports = router;

const ScheduleModel = require("../models/Appointments");
const HttpResponseError = require("../utils/HttpResponseError");
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
// Estendendo o dayjs com o plugin de parse format
dayjs.extend(customParseFormat);

const createSchedule = async (
  person_name,
  location,
  scheduling_date,
  user_id
) => {
  try {
    if (!dayjs(scheduling_date, "DD/MM/YYYY HH:mm:ss").isValid()) {
      throw new HttpResponseError.BadRequestError("Invalid format date!");
    }

    const formatedSchedulingDate = dayjs(
      scheduling_date,
      "DD/MM/YYYY HH:mm:ss"
    ).format("YYYY-MM-DD HH:mm:ss");

    const existingSchedule =
      await ScheduleModel.getTheAppointmentTimeAndLocation(
        formatedSchedulingDate,
        location.trim()
      );

    // Já existe um agendamento com essa data e hora
    if (existingSchedule && existingSchedule.length > 0) {
      throw new HttpResponseError.ExistResourceError(
        "There is already a schedule with that date and location!"
      );
    }

    const resultInsert = await ScheduleModel.insertSchedule(
      person_name,
      location,
      formatedSchedulingDate,
      user_id
    );

    if (!resultInsert) {
      throw new HttpResponseError.NotAcceptableError(
        "Unable to create schedule!"
      );
    }

    return {
      person_name,
      location,
      scheduling_date,
    };
  } catch (error) {
    console.error(error?.message);
    throw error;
  }
};

const listAppointments = async () => {
  return await ScheduleModel.listAppointments();
};

const getAppointment = async (scheduling_id) => {
  return await ScheduleModel.getAppointment(scheduling_id);
};

const updateSchedule = async (
  scheduling_id,
  person_name,
  location,
  scheduling_date,
  user_id
) => {
  try {
    if (!dayjs(scheduling_date, "DD/MM/YYYY HH:mm:ss").isValid()) {
      throw new HttpResponseError.BadRequestError("Invalid format date!");
    }

    const formatedSchedulingDate = dayjs(
      scheduling_date,
      "DD/MM/YYYY HH:mm:ss"
    ).format("YYYY-MM-DD HH:mm:ss");

    let updateData = {
      scheduling_id,
      person_name,
      location,
      user_id,
    };

    updateData = { ...updateData, scheduling_date: formatedSchedulingDate };
    const resultUpdate = await ScheduleModel.updateSchedule(updateData);

    if (!resultUpdate || resultUpdate.length === 0) {
      throw new HttpResponseError.NotAcceptableError(
        "Unable to update schedule!"
      );
    }

    return resultUpdate;
  } catch (error) {
    console.error(error?.message);
    throw error;
  }
};

const deleteAppointment = async (scheduling_id) => {
  return await ScheduleModel.deleteAppointment(scheduling_id);
};

module.exports = {
  createSchedule,
  listAppointments,
  getAppointment,
  updateSchedule,
  deleteAppointment,
};
